"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _info = _interopRequireDefault(require("./info"));

var _filterMedia = _interopRequireDefault(require("./filter-media"));

var _download = require("./download");

var _isUrl = _interopRequireDefault(require("./is-url"));

var _protocols = _interopRequireDefault(require("./protocols"));

var _formats = _interopRequireDefault(require("./formats"));

var scdl = {};

var download = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url, clientID) {
    var info;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _info["default"])(url, clientID);

          case 2:
            info = _context.sent;
            _context.next = 5;
            return (0, _download.fromMediaObj)(info.media.transcodings[0], clientID);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function download(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var downloadFormat = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(url, clientID, format) {
    var info, filtered;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _info["default"])(url, clientID);

          case 2:
            info = _context2.sent;
            filtered = (0, _filterMedia["default"])(info.media.transcodings, {
              format: format
            });
            console.log(filtered);

            if (!(filtered.length === 0)) {
              _context2.next = 7;
              break;
            }

            throw new Error("Could not find media with specified format: (".concat(format, ")"));

          case 7:
            _context2.next = 9;
            return (0, _download.fromMediaObj)(filtered[0], clientID);

          case 9:
            return _context2.abrupt("return", _context2.sent);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function downloadFormat(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

scdl.filterMedia = _filterMedia["default"];
scdl.STREAMING_PROTOCOLS = _protocols["default"];
scdl.FORMATS = _formats["default"];
scdl.download = download;
scdl.downloadMedia = _download.fromMediaObj;
scdl.downloadFromURL = _download.fromURL;
scdl.getInfo = _info["default"];
scdl.isValidURL = _isUrl["default"];
scdl.downloadFormat = downloadFormat;
var _default = scdl;
exports["default"] = _default;
//# sourceMappingURL=index.js.map