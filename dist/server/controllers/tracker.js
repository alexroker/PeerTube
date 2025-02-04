"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebsocketTrackerServer = exports.trackerRouter = void 0;
const tslib_1 = require("tslib");
const bitTorrentTracker = require("bittorrent-tracker");
const express = require("express");
const http = require("http");
const proxyAddr = require("proxy-addr");
const ws_1 = require("ws");
const redis_1 = require("@server/lib/redis");
const logger_1 = require("../helpers/logger");
const config_1 = require("../initializers/config");
const constants_1 = require("../initializers/constants");
const video_file_1 = require("../models/video/video-file");
const video_streaming_playlist_1 = require("../models/video/video-streaming-playlist");
const TrackerServer = bitTorrentTracker.Server;
const trackerRouter = express.Router();
exports.trackerRouter = trackerRouter;
let peersIps = {};
let peersIpInfoHash = {};
runPeersChecker();
const trackerServer = new TrackerServer({
    http: false,
    udp: false,
    ws: false,
    dht: false,
    filter: function (infoHash, params, cb) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (config_1.CONFIG.TRACKER.ENABLED === false) {
                return cb(new Error('Tracker is disabled on this instance.'));
            }
            let ip;
            if (params.type === 'ws') {
                ip = params.socket.ip;
            }
            else {
                ip = params.httpReq.ip;
            }
            const key = ip + '-' + infoHash;
            peersIps[ip] = peersIps[ip] ? peersIps[ip] + 1 : 1;
            peersIpInfoHash[key] = peersIpInfoHash[key] ? peersIpInfoHash[key] + 1 : 1;
            if (config_1.CONFIG.TRACKER.REJECT_TOO_MANY_ANNOUNCES && peersIpInfoHash[key] > constants_1.TRACKER_RATE_LIMITS.ANNOUNCES_PER_IP_PER_INFOHASH) {
                return cb(new Error(`Too many requests (${peersIpInfoHash[key]} of ip ${ip} for torrent ${infoHash}`));
            }
            try {
                if (config_1.CONFIG.TRACKER.PRIVATE === false)
                    return cb();
                const videoFileExists = yield video_file_1.VideoFileModel.doesInfohashExistCached(infoHash);
                if (videoFileExists === true)
                    return cb();
                const playlistExists = yield video_streaming_playlist_1.VideoStreamingPlaylistModel.doesInfohashExist(infoHash);
                if (playlistExists === true)
                    return cb();
                cb(new Error(`Unknown infoHash ${infoHash} requested by ip ${ip}`));
                if (params.type === 'ws') {
                    redis_1.Redis.Instance.setTrackerBlockIP(ip)
                        .catch(err => logger_1.logger.error('Cannot set tracker block ip.', { err }));
                    setTimeout(() => params.socket.close(), 0);
                }
            }
            catch (err) {
                logger_1.logger.error('Error in tracker filter.', { err });
                return cb(err);
            }
        });
    }
});
if (config_1.CONFIG.TRACKER.ENABLED !== false) {
    trackerServer.on('error', function (err) {
        logger_1.logger.error('Error in tracker.', { err });
    });
    trackerServer.on('warning', function (err) {
        logger_1.logger.warn('Warning in tracker.', { err });
    });
}
const onHttpRequest = trackerServer.onHttpRequest.bind(trackerServer);
trackerRouter.get('/tracker/announce', (req, res) => onHttpRequest(req, res, { action: 'announce' }));
trackerRouter.get('/tracker/scrape', (req, res) => onHttpRequest(req, res, { action: 'scrape' }));
function createWebsocketTrackerServer(app) {
    const server = http.createServer(app);
    const wss = new ws_1.Server({ noServer: true });
    wss.on('connection', function (ws, req) {
        ws['ip'] = proxyAddr(req, config_1.CONFIG.TRUST_PROXY);
        trackerServer.onWebSocketConnection(ws);
    });
    server.on('upgrade', (request, socket, head) => {
        if (request.url === '/tracker/socket') {
            const ip = proxyAddr(request, config_1.CONFIG.TRUST_PROXY);
            redis_1.Redis.Instance.doesTrackerBlockIPExist(ip)
                .then(result => {
                if (result === true) {
                    logger_1.logger.debug('Blocking IP %s from tracker.', ip);
                    socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
                    socket.destroy();
                    return;
                }
                return wss.handleUpgrade(request, socket, head, ws => wss.emit('connection', ws, request));
            })
                .catch(err => logger_1.logger.error('Cannot check if tracker block ip exists.', { err }));
        }
    });
    return server;
}
exports.createWebsocketTrackerServer = createWebsocketTrackerServer;
function runPeersChecker() {
    setInterval(() => {
        logger_1.logger.debug('Checking peers.');
        for (const ip of Object.keys(peersIpInfoHash)) {
            if (peersIps[ip] > constants_1.TRACKER_RATE_LIMITS.ANNOUNCES_PER_IP) {
                logger_1.logger.warn('Peer %s made abnormal requests (%d).', ip, peersIps[ip]);
            }
        }
        peersIpInfoHash = {};
        peersIps = {};
    }, constants_1.TRACKER_RATE_LIMITS.INTERVAL);
}
