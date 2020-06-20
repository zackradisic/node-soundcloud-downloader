"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var getInfo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url) {
    var res, mediaRaw, media;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _axios["default"].get(url, {
              withCredentials: true
            });

          case 2:
            res = _context.sent;
            mediaRaw = '{' + res.data.slice(res.data.indexOf('"media":{'), res.data.indexOf(',"title"')) + '}';
            media = JSON.parse(mediaRaw).media.transcodings;
            return _context.abrupt("return", media);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getInfo(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getInfo;
exports["default"] = _default;
//# sourceMappingURL=info.js.map