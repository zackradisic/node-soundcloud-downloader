"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromMediaObj = exports.fromMediaObjBase = exports.fromURL = exports.fromURLBase = exports.getHLSStream = exports.getProgressiveStream = exports.getMediaURL = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _m3u8stream = _interopRequireDefault(require("m3u8stream"));

var _util = require("./util");

var getMediaURL = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url, clientID, axiosInstance) {
    var res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return axiosInstance.get("".concat(url, "?client_id=").concat(clientID), {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36',
                Accept: '*/*',
                'Accept-Encoding': 'gzip, deflate, br'
              },
              withCredentials: true
            });

          case 2:
            res = _context.sent;

            if (res.data.url) {
              _context.next = 5;
              break;
            }

            throw new Error("Invalid response from Soundcloud. Check if the URL provided is correct: ".concat(url));

          case 5:
            return _context.abrupt("return", res.data.url);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getMediaURL(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getMediaURL = getMediaURL;

var getProgressiveStream = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(mediaUrl, axiosInstance) {
    var r;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return axiosInstance.get(mediaUrl, {
              withCredentials: true,
              responseType: 'stream'
            });

          case 2:
            r = _context2.sent;
            return _context2.abrupt("return", r.data);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getProgressiveStream(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getProgressiveStream = getProgressiveStream;

var getHLSStream = function getHLSStream(mediaUrl) {
  return (0, _m3u8stream["default"])(mediaUrl);
};

exports.getHLSStream = getHLSStream;

var fromURLBase = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(url, clientID, getMediaURLFunction, getProgressiveStreamFunction, getHLSStreamFunction, axiosInstance) {
    var mediaUrl;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return getMediaURLFunction(url, clientID, axiosInstance);

          case 3:
            mediaUrl = _context3.sent;

            if (!url.includes('/progressive')) {
              _context3.next = 8;
              break;
            }

            _context3.next = 7;
            return getProgressiveStreamFunction(mediaUrl, axiosInstance);

          case 7:
            return _context3.abrupt("return", _context3.sent);

          case 8:
            return _context3.abrupt("return", getHLSStreamFunction(mediaUrl));

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            throw (0, _util.handleRequestErrs)(_context3.t0);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));

  return function fromURLBase(_x6, _x7, _x8, _x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

exports.fromURLBase = fromURLBase;

var fromURL = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(url, clientID) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return fromURLBase(url, clientID, getMediaURL, getProgressiveStream, getHLSStream, _axios["default"]);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function fromURL(_x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

exports.fromURL = fromURL;

var fromMediaObjBase = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(media, clientID, getMediaURLFunction, getProgressiveStreamFunction, getHLSStreamFunction, fromURLFunction, axiosInstance) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (validatemedia(media)) {
              _context5.next = 2;
              break;
            }

            throw new Error('Invalid media object provided');

          case 2:
            _context5.next = 4;
            return fromURLFunction(media.url, clientID, getMediaURLFunction, getProgressiveStreamFunction, getHLSStreamFunction, axiosInstance);

          case 4:
            return _context5.abrupt("return", _context5.sent);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function fromMediaObjBase(_x14, _x15, _x16, _x17, _x18, _x19, _x20) {
    return _ref5.apply(this, arguments);
  };
}();

exports.fromMediaObjBase = fromMediaObjBase;

var fromMediaObj = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(media, clientID) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return fromMediaObjBase(media, clientID, getMediaURL, getProgressiveStream, getHLSStream, fromURL, _axios["default"]);

          case 2:
            return _context6.abrupt("return", _context6.sent);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function fromMediaObj(_x21, _x22) {
    return _ref6.apply(this, arguments);
  };
}();

exports.fromMediaObj = fromMediaObj;

var validatemedia = function validatemedia(media) {
  if (!media.url || !media.format) return false;
  return true;
};
//# sourceMappingURL=download.js.map