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
exports.convertFirebaseURL = exports.isFirebaseURL = exports.stripMobilePrefix = exports.isPersonalizedTrackURL = exports.isPlaylistURL = void 0;
/** @internal @packageDocumentation */
var regexp = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
var mobileUrlRegex = /^https?:\/\/(m\.soundcloud\.com)\/(.*)$/;
var firebaseUrlRegex = /^https?:\/\/(soundcloud\.app\.goo\.gl)\/(.*)$/;
var firebaseRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,500}\.[a-zA-Z0-9()]{1,500}\b([-a-zA-Z0-9()@:%_+.~#?&//\\=]*)/g;
var isURL = function (url, testMobile, testFirebase) {
    var success = false;
    if (testMobile) {
        if (url.match(mobileUrlRegex))
            success = !!url.match(regexp)[2];
    }
    if (!success && testFirebase) {
        if (url.match(firebaseRegexp))
            success = !!url.match(firebaseRegexp)[2];
    }
    if (!success && url.match(regexp))
        success = !!url.match(regexp)[2];
    return success;
};
exports.isPlaylistURL = function (url) {
    if (!isURL(url))
        return false;
    try {
        var u = new URL(url);
        return u.pathname.includes('/sets/');
    }
    catch (err) {
        return false;
    }
};
exports.isPersonalizedTrackURL = function (url) {
    if (!isURL(url))
        return false;
    return url.includes('https://soundcloud.com/discover/sets/personalized-tracks::');
};
exports.stripMobilePrefix = function (url) {
    if (!url.includes('m.soundcloud.com'))
        return url;
    var _url = new URL(url);
    _url.hostname = 'soundcloud.com';
    return _url.toString();
};
exports.isFirebaseURL = function (url) {
    return url.includes('https://soundcloud.app.goo.gl');
};
exports.convertFirebaseURL = function (url, axiosInstance) { return __awaiter(void 0, void 0, void 0, function () {
    var _url, data, matches, firebaseURL;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _url = new URL(url);
                _url.searchParams.set('d', '1');
                return [4 /*yield*/, axiosInstance.get(_url.toString())];
            case 1:
                data = (_a.sent()).data;
                matches = data.match(firebaseRegexp);
                if (!matches)
                    throw new Error("Could not find URL for this SoundCloud Firebase URL: " + url);
                firebaseURL = matches.find(function (match) { return regexp.test(match); });
                if (!firebaseURL)
                    return [2 /*return*/, undefined
                        // Some of the characters are in their unicode character code form (e.g. \u003d),
                        // use regex to find occurences of \uXXXX, parse their hexidecimal unicode value and convert to regular char
                    ];
                // Some of the characters are in their unicode character code form (e.g. \u003d),
                // use regex to find occurences of \uXXXX, parse their hexidecimal unicode value and convert to regular char
                return [2 /*return*/, firebaseURL.replace(/\\u([\d\w]{4})/gi, function (_match, grp) { return String.fromCharCode(parseInt(grp, 16)); })];
        }
    });
}); };
exports["default"] = isURL;
