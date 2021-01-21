"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.create = exports.SCDL = void 0;
var soundcloud_key_fetch_1 = __importDefault(require("soundcloud-key-fetch"));
var info_1 = __importStar(require("./info"));
var filter_media_1 = __importDefault(require("./filter-media"));
var download_1 = require("./download");
var url_1 = __importStar(require("./url"));
var protocols_1 = require("./protocols");
var formats_1 = require("./formats");
var search_1 = require("./search");
var download_playlist_1 = require("./download-playlist");
var axios_1 = __importDefault(require("axios"));
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var likes_1 = require("./likes");
var user_1 = require("./user");
/** @internal */
var downloadFormat = function (url, clientID, format, axiosInstance) { return __awaiter(void 0, void 0, void 0, function () {
    var info, filtered;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, info_1["default"](url, clientID, axiosInstance)];
            case 1:
                info = _a.sent();
                filtered = filter_media_1["default"](info.media.transcodings, { format: format });
                if (filtered.length === 0)
                    throw new Error("Could not find media with specified format: (" + format + ")");
                return [4 /*yield*/, download_1.fromMediaObj(filtered[0], clientID, axiosInstance)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var SCDL = /** @class */ (function () {
    function SCDL(options) {
        this.saveClientID = process.env.SAVE_CLIENT_ID ? process.env.SAVE_CLIENT_ID.toLowerCase() === 'true' : false;
        if (!options)
            options = {};
        if (options.saveClientID) {
            this.saveClientID = options.saveClientID;
            if (options.filePath)
                this._filePath = options.filePath;
        }
        else {
            if (options.clientID) {
                this._clientID = options.clientID;
            }
        }
        if (options.axiosInstance) {
            this.setAxiosInstance(options.axiosInstance);
        }
        else {
            this.setAxiosInstance(axios_1["default"]);
        }
        if (!options.stripMobilePrefix)
            options.stripMobilePrefix = true;
        if (!options.convertFirebaseLinks)
            options.convertFirebaseLinks = true;
        this.stripMobilePrefix = options.stripMobilePrefix;
        this.convertFirebaseLinks = options.convertFirebaseLinks;
    }
    /**
     * Returns a media Transcoding that matches the given predicate object
     * @param media - The Transcodings to filter
     * @param predicateObj - The desired Transcoding object to match
     * @returns An array of Transcodings that match the predicate object
     */
    SCDL.prototype.filterMedia = function (media, predicateObj) {
        return filter_media_1["default"](media, predicateObj);
    };
    /**
     * Get the audio of a given track. It returns the first format found.
     *
     * @param url - The URL of the Soundcloud track
     * @returns A ReadableStream containing the audio data
    */
    SCDL.prototype.download = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = download_1.download;
                        return [4 /*yield*/, this.prepareURL(url)];
                    case 1:
                        _b = [_c.sent()];
                        return [4 /*yield*/, this.getClientID()];
                    case 2: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent(), this.axios]))];
                }
            });
        });
    };
    /**
     *  Get the audio of a given track with the specified format
     * @param url - The URL of the Soundcloud track
     * @param format - The desired format
    */
    SCDL.prototype.downloadFormat = function (url, format) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = downloadFormat;
                        return [4 /*yield*/, this.prepareURL(url)];
                    case 1:
                        _b = [_c.sent()];
                        return [4 /*yield*/, this.getClientID()];
                    case 2: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent(), format, this.axios]))];
                }
            });
        });
    };
    /**
     * Returns info about a given track.
     * @param url - URL of the Soundcloud track
     * @returns Info about the track
    */
    SCDL.prototype.getInfo = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = info_1["default"];
                        return [4 /*yield*/, this.prepareURL(url)];
                    case 1:
                        _b = [_c.sent()];
                        return [4 /*yield*/, this.getClientID()];
                    case 2: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent(), this.axios]))];
                }
            });
        });
    };
    /**
     * Returns info about the given track(s) specified by ID.
     * @param ids - The ID(s) of the tracks
     * @returns Info about the track
     */
    SCDL.prototype.getTrackInfoByID = function (ids, playlistID, playlistSecretToken) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = info_1.getTrackInfoByID;
                        return [4 /*yield*/, this.getClientID()];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent(), this.axios, ids, playlistID, playlistSecretToken])];
                }
            });
        });
    };
    /**
     * Returns info about the given set
     * @param url - URL of the Soundcloud set
     * @returns Info about the set
     */
    SCDL.prototype.getSetInfo = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = info_1.getSetInfo;
                        return [4 /*yield*/, this.prepareURL(url)];
                    case 1:
                        _b = [_c.sent()];
                        return [4 /*yield*/, this.getClientID()];
                    case 2: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent(), this.axios]))];
                }
            });
        });
    };
    /**
     * Searches for tracks/playlists for the given query
     * @param options - The search option
     * @returns SearchResponse
     */
    SCDL.prototype.search = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = search_1.search;
                        _b = [options, this.axios];
                        return [4 /*yield*/, this.getClientID()];
                    case 1: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                }
            });
        });
    };
    /**
     * Finds related tracks to the given track specified by ID
     * @param id - The ID of the track
     * @param limit - The number of results to return
     * @param offset - Used for pagination, set to 0 if you will not use this feature.
     */
    SCDL.prototype.related = function (id, limit, offset) {
        if (offset === void 0) { offset = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = search_1.related;
                        _b = [id, limit, offset, this.axios];
                        return [4 /*yield*/, this.getClientID()];
                    case 1: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                }
            });
        });
    };
    /**
     * Returns the audio streams and titles of the tracks in the given playlist.
     * @param url - The url of the playlist
     */
    SCDL.prototype.downloadPlaylist = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = download_playlist_1.downloadPlaylist;
                        return [4 /*yield*/, this.prepareURL(url)];
                    case 1:
                        _b = [_c.sent()];
                        return [4 /*yield*/, this.getClientID()];
                    case 2: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent(), this.axios]))];
                }
            });
        });
    };
    /**
     * Returns track information for a user's likes
     * @param options - Can either be the profile URL of the user, or their ID
     * @returns - An array of tracks
     */
    SCDL.prototype.getLikes = function (options, limit, offset) {
        if (limit === void 0) { limit = 10; }
        if (offset === void 0) { offset = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var id, clientID, user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getClientID()];
                    case 1:
                        clientID = _b.sent();
                        if (!options.id) return [3 /*break*/, 2];
                        id = options.id;
                        return [3 /*break*/, 6];
                    case 2:
                        if (!options.profileURL) return [3 /*break*/, 5];
                        _a = user_1.getUser;
                        return [4 /*yield*/, this.prepareURL(options.profileURL)];
                    case 3: return [4 /*yield*/, _a.apply(void 0, [_b.sent(), clientID, this.axios])];
                    case 4:
                        user = _b.sent();
                        id = user.id;
                        return [3 /*break*/, 6];
                    case 5: throw new Error('options.id or options.profileURL must be provided.');
                    case 6: return [2 /*return*/, likes_1.getLikes(id, clientID, this.axios, limit, offset)];
                }
            });
        });
    };
    /**
     * Returns information about a user
     * @param url - The profile URL of the user
     */
    SCDL.prototype.getUser = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = user_1.getUser;
                        return [4 /*yield*/, this.prepareURL(url)];
                    case 1:
                        _b = [_c.sent()];
                        return [4 /*yield*/, this.getClientID()];
                    case 2: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent(), this.axios]))];
                }
            });
        });
    };
    /**
     * Sets the instance of Axios to use to make requests to SoundCloud API
     * @param instance - An instance of Axios
     */
    SCDL.prototype.setAxiosInstance = function (instance) {
        this.axios = instance;
    };
    /**
     * Returns whether or not the given URL is a valid Soundcloud URL
     * @param url - URL of the Soundcloud track
    */
    SCDL.prototype.isValidUrl = function (url) {
        return url_1["default"](url, this.convertFirebaseLinks, this.stripMobilePrefix);
    };
    /**
     * Returns whether or not the given URL is a valid playlist SoundCloud URL
     * @param url - The URL to check
     */
    SCDL.prototype.isPlaylistURL = function (url) {
        return url_1.isPlaylistURL(url);
    };
    /**
     * Returns true if the given URL is a personalized track URL. (of the form https://soundcloud.com/discover/sets/personalized-tracks::user-sdlkfjsldfljs:847104873)
     * @param url - The URL to check
     */
    SCDL.prototype.isPersonalizedTrackURL = function (url) {
        return url_1.isPersonalizedTrackURL(url);
    };
    /**
     * Returns true if the given URL is a Firebase URL (of the form https://soundcloud.app.goo.gl/XXXXXXXX)
     * @param url - The URL to check
     */
    SCDL.prototype.isFirebaseURL = function (url) {
        return url_1.isFirebaseURL(url);
    };
    SCDL.prototype.getClientID = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this._clientID) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.setClientID()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this._clientID];
                }
            });
        });
    };
    /** @internal */
    SCDL.prototype.setClientID = function (clientID) {
        return __awaiter(this, void 0, void 0, function () {
            var filename, c, _a, data, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!clientID) return [3 /*break*/, 8];
                        if (!!this._clientID) return [3 /*break*/, 7];
                        if (!this.saveClientID) return [3 /*break*/, 5];
                        filename = path.resolve(__dirname, this._filePath ? this._filePath : '../client_id.json');
                        return [4 /*yield*/, this._getClientIDFromFile(filename)];
                    case 1:
                        c = _c.sent();
                        if (!!c) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, soundcloud_key_fetch_1["default"].fetchKey()];
                    case 2:
                        _a._clientID = _c.sent();
                        data = {
                            clientID: this._clientID,
                            date: new Date().toISOString()
                        };
                        fs.writeFile(filename, JSON.stringify(data), {}, function (err) {
                            if (err)
                                console.log('Failed to save client_id to file: ' + err);
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        this._clientID = c;
                        _c.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        _b = this;
                        return [4 /*yield*/, soundcloud_key_fetch_1["default"].fetchKey()];
                    case 6:
                        _b._clientID = _c.sent();
                        _c.label = 7;
                    case 7: return [2 /*return*/, this._clientID];
                    case 8:
                        this._clientID = clientID;
                        return [2 /*return*/, clientID];
                }
            });
        });
    };
    /** @internal */
    SCDL.prototype._getClientIDFromFile = function (filename) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!fs.existsSync(filename))
                            return resolve('');
                        fs.readFile(filename, 'utf8', function (err, data) {
                            if (err)
                                return reject(err);
                            var c;
                            try {
                                c = JSON.parse(data);
                            }
                            catch (err) {
                                return reject(err);
                            }
                            if (!c.date && !c.clientID)
                                return reject(new Error("Property 'data' or 'clientID' missing from client_id.json"));
                            if (typeof c.clientID !== 'string')
                                return reject(new Error("Property 'clientID' is not a string in client_id.json"));
                            if (typeof c.date !== 'string')
                                return reject(new Error("Property 'date' is not a string in client_id.json"));
                            var d = new Date(c.date);
                            if (!d.getDay())
                                return reject(new Error("Invalid date object from 'date' in client_id.json"));
                            var dayMs = 60 * 60 * 24 * 1000;
                            if (new Date().getTime() - d.getTime() >= dayMs) {
                                // Older than a day, delete
                                fs.unlink(filename, function (err) {
                                    if (err)
                                        console.log('Failed to delete client_id.json: ' + err);
                                });
                                return resolve('');
                            }
                            else {
                                return resolve(c.clientID);
                            }
                        });
                    })];
            });
        });
    };
    /**
     * Prepares the given URL by stripping its mobile prefix (if this.stripMobilePrefix is true)
     * and converting it to a regular URL (if this.convertFireBaseLinks is true.)
     * @param url
     */
    SCDL.prototype.prepareURL = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.stripMobilePrefix)
                            url = url_1.stripMobilePrefix(url);
                        if (!this.convertFirebaseLinks) return [3 /*break*/, 2];
                        if (!url_1.isFirebaseURL(url)) return [3 /*break*/, 2];
                        return [4 /*yield*/, url_1.convertFirebaseURL(url, this.axios)];
                    case 1:
                        url = _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, url];
                }
            });
        });
    };
    return SCDL;
}());
exports.SCDL = SCDL;
// SCDL instance with default configutarion
var scdl = new SCDL();
// Creates an instance of SCDL with custom configuration
var create = function (options) { return new SCDL(options); };
exports.create = create;
scdl.STREAMING_PROTOCOLS = protocols_1._PROTOCOLS;
scdl.FORMATS = formats_1._FORMATS;
exports["default"] = scdl;
