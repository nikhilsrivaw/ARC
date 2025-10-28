"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = exports.pool = void 0;
const database_1 = __importDefault(require("./database"));
const pool_1 = __importDefault(require("./pool"));
exports.pool = pool_1.default;
const config_1 = require("./config");
Object.defineProperty(exports, "getDatabaseConfig", { enumerable: true, get: function () { return config_1.getDatabaseConfig; } });
exports.default = database_1.default;
//# sourceMappingURL=index.js.map