"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchActorByUrl = void 0;
const actor_1 = require("../models/activitypub/actor");
function fetchActorByUrl(url, fetchType) {
    if (fetchType === 'all')
        return actor_1.ActorModel.loadByUrlAndPopulateAccountAndChannel(url);
    if (fetchType === 'association-ids')
        return actor_1.ActorModel.loadByUrl(url);
}
exports.fetchActorByUrl = fetchActorByUrl;
