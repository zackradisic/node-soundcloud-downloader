"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var regexp = /^https?:\/\/(soundcloud\.com)\/(.*)$/;

var isURL = function isURL(url) {
  return url.match(regexp) && url.match(regexp)[2];
};

var _default = isURL;
exports["default"] = _default;
//# sourceMappingURL=is-url.js.map