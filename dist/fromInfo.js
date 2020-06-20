"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _m3u8stream = _interopRequireDefault(require("m3u8stream"));

var _protocols = _interopRequireDefault(require("./protocols"));

var fromInfo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(info, clientID) {
    var link, res, r;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (validateInfo) {
              _context.next = 2;
              break;
            }

            throw new Error('Invalid info object provided');

          case 2:
            link = "".concat(info.url, "?client_id=").concat(clientID);
            _context.next = 5;
            return _axios["default"].get(link, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36',
                Accept: '*/*',
                'Accept-Encoding': 'gzip, deflate, br'
              },
              withCredentials: true
            });

          case 5:
            res = _context.sent;

            if (res.data.url) {
              _context.next = 8;
              break;
            }

            throw new Error("Invalid response from Soundcloud. Check if the URL provided is correct: ".concat(link));

          case 8:
            if (!(info.format.protocol === _protocols["default"].PROGRESSIVE)) {
              _context.next = 13;
              break;
            }

            _context.next = 11;
            return _axios["default"].get(res.data.url, {
              withCredentials: true,
              responseType: 'stream'
            });

          case 11:
            r = _context.sent;
            return _context.abrupt("return", r.data);

          case 13:
            return _context.abrupt("return", (0, _m3u8stream["default"])(res.data.url));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fromInfo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var validateInfo = function validateInfo(info) {
  if (!info.url || !info.format) return false;
  return true;
};

var _default = fromInfo;
exports["default"] = _default;
//# sourceMappingURL=fromInfo.js.map