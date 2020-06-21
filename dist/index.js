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

var _downloadMedia = _interopRequireDefault(require("./download-media"));

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
            return (0, _downloadMedia["default"])(info.media.transcodings[0], clientID);

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

scdl.filterMedia = _filterMedia["default"];
scdl.STREAMING_PROTOCOLS = _protocols["default"];
scdl.FORMATS = _formats["default"];
scdl.download = download;
scdl.getInfo = _info["default"];
var _default = scdl;
exports["default"] = _default;
//# sourceMappingURL=index.js.map