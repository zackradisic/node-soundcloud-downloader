"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var filterFormats = function filterFormats(info, predicateObj) {
  return info.filter(function (_ref) {
    var format = _ref.format;
    var match = false;
    if (predicateObj.protocol) match = format.protocol === predicateObj.protocol;
    if (predicateObj.format) match = format.mime_type === predicateObj.format;
    return match;
  });
};

var _default = filterFormats;
exports["default"] = _default;
//# sourceMappingURL=filter-formats.js.map