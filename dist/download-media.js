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

var _util = require("./util");

var fromMedia = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(media, clientID) {
    var link, res, r;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (validatemedia) {
              _context.next = 2;
              break;
            }

            throw new Error('Invalid media object provided');

          case 2:
            _context.prev = 2;
            link = "".concat(media.url, "?client_id=").concat(clientID);
            _context.next = 6;
            return _axios["default"].get(link, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36',
                Accept: '*/*',
                'Accept-Encoding': 'gzip, deflate, br'
              },
              withCredentials: true
            });

          case 6:
            res = _context.sent;

            if (res.data.url) {
              _context.next = 9;
              break;
            }

            throw new Error("Invalid response from Soundcloud. Check if the URL provided is correct: ".concat(link));

          case 9:
            if (!(media.format.protocol === _protocols["default"].PROGRESSIVE)) {
              _context.next = 14;
              break;
            }

            _context.next = 12;
            return _axios["default"].get(res.data.url, {
              withCredentials: true,
              responseType: 'stream'
            });

          case 12:
            r = _context.sent;
            return _context.abrupt("return", r.data);

          case 14:
            return _context.abrupt("return", (0, _m3u8stream["default"])(res.data.url));

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](2);
            throw (0, _util.handleRequestErrs)(_context.t0);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 17]]);
  }));

  return function fromMedia(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var validatemedia = function validatemedia(media) {
  if (!media.url || !media.format) return false;
  return true;
};

var _default = fromMedia;
exports["default"] = _default;
//# sourceMappingURL=download-media.js.map