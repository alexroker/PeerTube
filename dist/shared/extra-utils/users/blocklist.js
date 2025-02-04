"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeServerFromServerBlocklist = exports.addServerToServerBlocklist = exports.getServerBlocklistByServer = exports.removeAccountFromServerBlocklist = exports.addAccountToServerBlocklist = exports.getAccountBlocklistByServer = exports.removeServerFromAccountBlocklist = exports.addServerToAccountBlocklist = exports.getServerBlocklistByAccount = exports.removeAccountFromAccountBlocklist = exports.addAccountToAccountBlocklist = exports.getAccountBlocklistByAccount = void 0;
const requests_1 = require("../requests/requests");
function getAccountBlocklistByAccount(url, token, start, count, sort = '-createdAt', statusCodeExpected = 200) {
    const path = '/api/v1/users/me/blocklist/accounts';
    return requests_1.makeGetRequest({
        url,
        token,
        query: { start, count, sort },
        path,
        statusCodeExpected
    });
}
exports.getAccountBlocklistByAccount = getAccountBlocklistByAccount;
function addAccountToAccountBlocklist(url, token, accountToBlock, statusCodeExpected = 204) {
    const path = '/api/v1/users/me/blocklist/accounts';
    return requests_1.makePostBodyRequest({
        url,
        path,
        token,
        fields: {
            accountName: accountToBlock
        },
        statusCodeExpected
    });
}
exports.addAccountToAccountBlocklist = addAccountToAccountBlocklist;
function removeAccountFromAccountBlocklist(url, token, accountToUnblock, statusCodeExpected = 204) {
    const path = '/api/v1/users/me/blocklist/accounts/' + accountToUnblock;
    return requests_1.makeDeleteRequest({
        url,
        path,
        token,
        statusCodeExpected
    });
}
exports.removeAccountFromAccountBlocklist = removeAccountFromAccountBlocklist;
function getServerBlocklistByAccount(url, token, start, count, sort = '-createdAt', statusCodeExpected = 200) {
    const path = '/api/v1/users/me/blocklist/servers';
    return requests_1.makeGetRequest({
        url,
        token,
        query: { start, count, sort },
        path,
        statusCodeExpected
    });
}
exports.getServerBlocklistByAccount = getServerBlocklistByAccount;
function addServerToAccountBlocklist(url, token, serverToBlock, statusCodeExpected = 204) {
    const path = '/api/v1/users/me/blocklist/servers';
    return requests_1.makePostBodyRequest({
        url,
        path,
        token,
        fields: {
            host: serverToBlock
        },
        statusCodeExpected
    });
}
exports.addServerToAccountBlocklist = addServerToAccountBlocklist;
function removeServerFromAccountBlocklist(url, token, serverToBlock, statusCodeExpected = 204) {
    const path = '/api/v1/users/me/blocklist/servers/' + serverToBlock;
    return requests_1.makeDeleteRequest({
        url,
        path,
        token,
        statusCodeExpected
    });
}
exports.removeServerFromAccountBlocklist = removeServerFromAccountBlocklist;
function getAccountBlocklistByServer(url, token, start, count, sort = '-createdAt', statusCodeExpected = 200) {
    const path = '/api/v1/server/blocklist/accounts';
    return requests_1.makeGetRequest({
        url,
        token,
        query: { start, count, sort },
        path,
        statusCodeExpected
    });
}
exports.getAccountBlocklistByServer = getAccountBlocklistByServer;
function addAccountToServerBlocklist(url, token, accountToBlock, statusCodeExpected = 204) {
    const path = '/api/v1/server/blocklist/accounts';
    return requests_1.makePostBodyRequest({
        url,
        path,
        token,
        fields: {
            accountName: accountToBlock
        },
        statusCodeExpected
    });
}
exports.addAccountToServerBlocklist = addAccountToServerBlocklist;
function removeAccountFromServerBlocklist(url, token, accountToUnblock, statusCodeExpected = 204) {
    const path = '/api/v1/server/blocklist/accounts/' + accountToUnblock;
    return requests_1.makeDeleteRequest({
        url,
        path,
        token,
        statusCodeExpected
    });
}
exports.removeAccountFromServerBlocklist = removeAccountFromServerBlocklist;
function getServerBlocklistByServer(url, token, start, count, sort = '-createdAt', statusCodeExpected = 200) {
    const path = '/api/v1/server/blocklist/servers';
    return requests_1.makeGetRequest({
        url,
        token,
        query: { start, count, sort },
        path,
        statusCodeExpected
    });
}
exports.getServerBlocklistByServer = getServerBlocklistByServer;
function addServerToServerBlocklist(url, token, serverToBlock, statusCodeExpected = 204) {
    const path = '/api/v1/server/blocklist/servers';
    return requests_1.makePostBodyRequest({
        url,
        path,
        token,
        fields: {
            host: serverToBlock
        },
        statusCodeExpected
    });
}
exports.addServerToServerBlocklist = addServerToServerBlocklist;
function removeServerFromServerBlocklist(url, token, serverToBlock, statusCodeExpected = 204) {
    const path = '/api/v1/server/blocklist/servers/' + serverToBlock;
    return requests_1.makeDeleteRequest({
        url,
        path,
        token,
        statusCodeExpected
    });
}
exports.removeServerFromServerBlocklist = removeServerFromServerBlocklist;
