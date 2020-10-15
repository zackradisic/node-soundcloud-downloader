"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getTrackInfoByID = exports.getSetInfo = exports.getInfoBase = void 0;
var axios_1 = require("./axios");
var util_1 = require("./util");
/** @internal */
var getTrackInfoBase = function (clientID, axiosRef, ids) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosRef.get(util_1.appendURL('https://api-v2.soundcloud.com/tracks', 'ids', ids.join(','), 'client_id', clientID))];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 2:
                err_1 = _a.sent();
                throw util_1.handleRequestErrs(err_1);
            case 3: return [2 /*return*/];
        }
    });
}); };
/** @internal */
exports.getInfoBase = function (url, clientID, axiosRef) { return __awaiter(void 0, void 0, void 0, function () {
    var res, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosRef.get(util_1.appendURL('https://api-v2.soundcloud.com/resolve', 'url', url, 'client_id', clientID), {
                        withCredentials: true
                    })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
            case 2:
                err_2 = _a.sent();
                console.log(err_2);
                throw util_1.handleRequestErrs(err_2);
            case 3: return [2 /*return*/];
        }
    });
}); };
/** @internal */
var getSetInfoBase = function (url, clientID, axiosRef) { return __awaiter(void 0, void 0, void 0, function () {
    var setInfo, incompleteTracks, completeTracks, ids, info;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getInfoBase(url, clientID, axiosRef)];
            case 1:
                setInfo = _a.sent();
                incompleteTracks = setInfo.tracks.filter(function (track) { return !track.title; });
                if (incompleteTracks.length === 0) {
                    return [2 /*return*/, setInfo];
                }
                completeTracks = setInfo.tracks.filter(function (track) { return track.title; });
                ids = incompleteTracks.map(function (t) { return t.id; });
                return [4 /*yield*/, exports.getTrackInfoByID(clientID, ids)];
            case 2:
                info = _a.sent();
                setInfo.tracks = completeTracks.concat(info);
                return [2 /*return*/, setInfo];
        }
    });
}); };
/** @internal */
var getInfo = function (url, clientID) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getInfoBase(url, clientID, axios_1.axiosManager.instance)];
            case 1:
                data = _a.sent();
                if (!data.media)
                    throw new Error('The given URL does not link to a Soundcloud track');
                return [2 /*return*/, data];
        }
    });
}); };
/** @internal */
exports.getSetInfo = function (url, clientID) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getSetInfoBase(url, clientID, axios_1.axiosManager.instance)];
            case 1:
                data = _a.sent();
                if (!data.tracks)
                    throw new Error('The given URL does not link to a Soundcloud set');
                return [2 /*return*/, data];
        }
    });
}); };
/** @intenral */
exports.getTrackInfoByID = function (clientID, ids) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getTrackInfoBase(clientID, axios_1.axiosManager.instance, ids)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports["default"] = getInfo;
