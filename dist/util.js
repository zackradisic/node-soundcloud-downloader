"use strict";
exports.__esModule = true;
exports.appendURL = exports.handleRequestErrs = void 0;
/** @internal @packageDocumentation */
var url_1 = require("url");
exports.handleRequestErrs = function (err) {
    if (!err.response)
        return err;
    if (!err.response.status)
        return err;
    if (err.response.status === 401)
        err.message += ', is your Client ID correct?';
    if (err.response.status === 404)
        err.message += ', could not find the song... it may be private - check the URL';
    return err;
};
exports.appendURL = function (url) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    var u = new url_1.URL(url);
    params.forEach(function (val, idx) {
        if (idx % 2 === 0)
            u.searchParams.append(val, params[idx + 1]);
    });
    return u.href;
};
