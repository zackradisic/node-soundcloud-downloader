"use strict";
/** @internal @packageDocumentation */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.axiosManager = void 0;
var axios_1 = __importDefault(require("axios"));
exports.axiosManager = {
    instance: axios_1["default"]
};
