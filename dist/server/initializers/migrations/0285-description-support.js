"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tslib_1 = require("tslib");
const Sequelize = require("sequelize");
function up(utils) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        {
            const data = {
                type: Sequelize.STRING(1000),
                allowNull: true,
                defaultValue: null
            };
            yield utils.queryInterface.changeColumn('video', 'support', data);
        }
        {
            const data = {
                type: Sequelize.STRING(1000),
                allowNull: true,
                defaultValue: null
            };
            yield utils.queryInterface.changeColumn('videoChannel', 'support', data);
        }
        {
            const data = {
                type: Sequelize.STRING(1000),
                allowNull: true,
                defaultValue: null
            };
            yield utils.queryInterface.changeColumn('videoChannel', 'description', data);
        }
        {
            const data = {
                type: Sequelize.STRING(1000),
                allowNull: true,
                defaultValue: null
            };
            yield utils.queryInterface.changeColumn('account', 'description', data);
        }
    });
}
exports.up = up;
function down(options) {
    throw new Error('Not implemented.');
}
exports.down = down;
