"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var filterMedia = function filterMedia(media, predicateObj) {
  return media.filter(function (_ref) {
    var format = _ref.format;
    var match = false;
    if (predicateObj.protocol) match = format.protocol === predicateObj.protocol;
    if (predicateObj.format) match = format.mime_type === predicateObj.format;
    return match;
  });
};

var _default = filterMedia;
exports["default"] = _default;
//# sourceMappingURL=filter-media.js.map