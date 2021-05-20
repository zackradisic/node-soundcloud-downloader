import { writeFile, existsSync, readFile, unlink } from 'fs';
import { resolve } from 'path';
import axios from 'axios';
import sckey from 'soundcloud-key-fetch';
import m3u8stream from 'm3u8stream';
import { URL as URL$1 } from 'url';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

/** @internal @packageDocumentation */
var resolveURL = 'https://api-v2.soundcloud.com/resolve';
var handleRequestErrs = function handleRequestErrs(err) {
  if (!err.response) return err;
  if (!err.response.status) return err;
  if (err.response.status === 401) err.message += ', is your Client ID correct?';
  if (err.response.status === 404) err.message += ', could not find the song... it may be private - check the URL';
  return err;
};
var appendURL = function appendURL(url) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  var u = new URL$1(url);
  params.forEach(function (val, idx) {
    if (idx % 2 === 0) u.searchParams.append(val, params[idx + 1]);
  });
  return u.href;
};
var extractIDFromPersonalizedTrackURL = function extractIDFromPersonalizedTrackURL(url) {
  if (!url.includes('https://soundcloud.com/discover/sets/personalized-tracks::')) return '';
  var split = url.split(':');
  if (split.length < 5) return '';
  return split[4];
};
var kindMismatchError = function kindMismatchError(expected, received) {
  return new Error("Expected resouce of kind: (" + expected + "), received: (" + received + ")");
};

var getTrackInfoBase = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(clientID, axiosRef, ids, playlistID, playlistSecretToken) {
    var url, _yield$axiosRef$get, data;

    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = appendURL('https://api-v2.soundcloud.com/tracks', 'ids', ids.join(','), 'client_id', clientID);

            if (playlistID && playlistSecretToken) {
              url = appendURL(url, 'playlistId', '' + playlistID, 'playlistSecretToken', playlistSecretToken);
            }

            _context.prev = 2;
            _context.next = 5;
            return axiosRef.get(url);

          case 5:
            _yield$axiosRef$get = _context.sent;
            data = _yield$axiosRef$get.data;
            return _context.abrupt("return", data);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            throw handleRequestErrs(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));

  return function getTrackInfoBase(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
/** @internal */


var getInfoBase = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(url, clientID, axiosRef) {
    var res;
    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return axiosRef.get(appendURL('https://api-v2.soundcloud.com/resolve', 'url', url, 'client_id', clientID), {
              withCredentials: true
            });

          case 3:
            res = _context2.sent;
            return _context2.abrupt("return", res.data);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            throw handleRequestErrs(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getInfoBase(_x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();
/** @internal */

var getSetInfoBase = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(url, clientID, axiosRef) {
    var setInfo, temp, playlistID, playlistSecretToken, incompleteTracks, completeTracks, ids, splitIds, x, _x12, i, promises, _info, info;

    return runtime_1.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getInfoBase(url, clientID, axiosRef);

          case 2:
            setInfo = _context4.sent;
            temp = [].concat(setInfo.tracks).map(function (track) {
              return track.id;
            });
            playlistID = setInfo.id;
            playlistSecretToken = setInfo.secret_token;
            incompleteTracks = setInfo.tracks.filter(function (track) {
              return !track.title;
            });

            if (!(incompleteTracks.length === 0)) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", setInfo);

          case 9:
            completeTracks = setInfo.tracks.filter(function (track) {
              return track.title;
            });
            ids = incompleteTracks.map(function (t) {
              return t.id;
            });

            if (!(ids.length > 50)) {
              _context4.next = 22;
              break;
            }

            splitIds = [];

            for (x = 0; x <= Math.floor(ids.length / 50); x++) {
              splitIds.push([]);
            }

            for (_x12 = 0; _x12 < ids.length; _x12++) {
              i = Math.floor(_x12 / 50);
              splitIds[i].push(ids[_x12]);
            }

            promises = splitIds.map( /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(ids) {
                return runtime_1.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return getTrackInfoByID(clientID, axiosRef, ids, playlistID, playlistSecretToken);

                      case 2:
                        return _context3.abrupt("return", _context3.sent);

                      case 3:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x13) {
                return _ref4.apply(this, arguments);
              };
            }());
            _context4.next = 18;
            return Promise.all(promises);

          case 18:
            _info = _context4.sent;
            setInfo.tracks = completeTracks.concat.apply(completeTracks, _info);
            setInfo.tracks = sortTracks(setInfo.tracks, temp);
            return _context4.abrupt("return", setInfo);

          case 22:
            _context4.next = 24;
            return getTrackInfoByID(clientID, axiosRef, ids, playlistID, playlistSecretToken);

          case 24:
            info = _context4.sent;
            setInfo.tracks = completeTracks.concat(info);
            setInfo.tracks = sortTracks(setInfo.tracks, temp);
            return _context4.abrupt("return", setInfo);

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getSetInfoBase(_x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();
/** @internal */


var sortTracks = function sortTracks(tracks, ids) {
  for (var i = 0; i < ids.length; i++) {
    if (tracks[i].id !== ids[i]) {
      for (var j = 0; j < tracks.length; j++) {
        if (tracks[j].id === ids[i]) {
          var temp = tracks[i];
          tracks[i] = tracks[j];
          tracks[j] = temp;
        }
      }
    }
  }

  return tracks;
};
/** @internal */


var getInfo = /*#__PURE__*/function () {
  var _ref5 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(url, clientID, axiosInstance) {
    var data, idString, id;
    return runtime_1.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!url.includes('https://soundcloud.com/discover/sets/personalized-tracks::')) {
              _context5.next = 18;
              break;
            }

            idString = extractIDFromPersonalizedTrackURL(url);

            if (idString) {
              _context5.next = 4;
              break;
            }

            throw new Error('Could not parse track ID from given URL: ' + url);

          case 4:
            _context5.prev = 4;
            id = parseInt(idString);
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](4);
            throw new Error('Could not parse track ID from given URL: ' + url);

          case 11:
            _context5.next = 13;
            return getTrackInfoByID(clientID, axiosInstance, [id]);

          case 13:
            data = _context5.sent[0];

            if (data) {
              _context5.next = 16;
              break;
            }

            throw new Error('Could not find track with ID: ' + id);

          case 16:
            _context5.next = 21;
            break;

          case 18:
            _context5.next = 20;
            return getInfoBase(url, clientID, axiosInstance);

          case 20:
            data = _context5.sent;

          case 21:
            if (data.media) {
              _context5.next = 23;
              break;
            }

            throw new Error('The given URL does not link to a Soundcloud track');

          case 23:
            return _context5.abrupt("return", data);

          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[4, 8]]);
  }));

  return function getInfo(_x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();
/** @internal */


var getSetInfo = /*#__PURE__*/function () {
  var _ref6 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(url, clientID, axiosInstance) {
    var data;
    return runtime_1.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getSetInfoBase(url, clientID, axiosInstance);

          case 2:
            data = _context6.sent;

            if (data.tracks) {
              _context6.next = 5;
              break;
            }

            throw new Error('The given URL does not link to a Soundcloud set');

          case 5:
            return _context6.abrupt("return", data);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getSetInfo(_x17, _x18, _x19) {
    return _ref6.apply(this, arguments);
  };
}();
/** @intenral */

var getTrackInfoByID = /*#__PURE__*/function () {
  var _ref7 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(clientID, axiosInstance, ids, playlistID, playlistSecretToken) {
    return runtime_1.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return getTrackInfoBase(clientID, axiosInstance, ids, playlistID, playlistSecretToken);

          case 2:
            return _context7.abrupt("return", _context7.sent);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getTrackInfoByID(_x20, _x21, _x22, _x23, _x24) {
    return _ref7.apply(this, arguments);
  };
}();

var getMediaURL = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(url, clientID, axiosInstance) {
    var res;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return axiosInstance.get(appendURL(url, 'client_id', clientID), {
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

            throw new Error("Invalid response from Soundcloud. Check if the URL provided is correct: " + url);

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
var getProgressive = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(mediaUrl, axiosInstance) {
    var r;
    return runtime_1.wrap(function _callee2$(_context2) {
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

  return function getProgressive(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
var getHLSStream = function getHLSStream(mediaUrl) {
  return m3u8stream(mediaUrl);
};
var fromURL = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(url, clientID, axiosInstance) {
    var mediaUrl;
    return runtime_1.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return getMediaURL(url, clientID, axiosInstance);

          case 3:
            mediaUrl = _context3.sent;

            if (!url.includes('/progressive')) {
              _context3.next = 8;
              break;
            }

            _context3.next = 7;
            return getProgressive(mediaUrl, axiosInstance);

          case 7:
            return _context3.abrupt("return", _context3.sent);

          case 8:
            return _context3.abrupt("return", getHLSStream(mediaUrl));

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            throw handleRequestErrs(_context3.t0);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));

  return function fromURL(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
var fromMediaObj = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(media, clientID, axiosInstance) {
    return runtime_1.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (validatemedia(media)) {
              _context4.next = 2;
              break;
            }

            throw new Error('Invalid media object provided');

          case 2:
            _context4.next = 4;
            return fromURL(media.url, clientID, axiosInstance);

          case 4:
            return _context4.abrupt("return", _context4.sent);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function fromMediaObj(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();
var fromDownloadLink = /*#__PURE__*/function () {
  var _ref5 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(id, clientID, axiosInstance) {
    var _yield$axiosInstance$, redirectUri, _yield$axiosInstance$2, data;

    return runtime_1.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return axiosInstance.get(appendURL("https://api-v2.soundcloud.com/tracks/" + id + "/download", 'client_id', clientID));

          case 2:
            _yield$axiosInstance$ = _context5.sent;
            redirectUri = _yield$axiosInstance$.data.redirectUri;
            _context5.next = 6;
            return axiosInstance.get(redirectUri, {
              responseType: 'stream'
            });

          case 6:
            _yield$axiosInstance$2 = _context5.sent;
            data = _yield$axiosInstance$2.data;
            return _context5.abrupt("return", data);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function fromDownloadLink(_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();
/** @internal */

var download = /*#__PURE__*/function () {
  var _ref6 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(url, options, clientID, axiosInstance) {
    var info;
    return runtime_1.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getInfo(url, clientID, axiosInstance);

          case 2:
            info = _context6.sent;

            if (!(info.downloadable && options.useDirectLink)) {
              _context6.next = 12;
              break;
            }

            _context6.prev = 4;
            _context6.next = 7;
            return fromDownloadLink(info.id, clientID, axiosInstance);

          case 7:
            return _context6.abrupt("return", _context6.sent);

          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](4);

          case 12:
            if (info.media) {
              _context6.next = 14;
              break;
            }

            throw new Error('No media found for given URL');

          case 14:
            _context6.next = 16;
            return fromMediaObj(info.media.transcodings[0], clientID, axiosInstance);

          case 16:
            return _context6.abrupt("return", _context6.sent);

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[4, 10]]);
  }));

  return function download(_x15, _x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

var validatemedia = function validatemedia(media) {
  if (!media.url || !media.format) return false;
  return true;
};

var downloadPlaylist = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(url, clientID, axiosInstance) {
    var info, trackNames, result;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getSetInfo(url, clientID, axiosInstance);

          case 2:
            info = _context.sent;
            trackNames = [];
            _context.next = 6;
            return Promise.all(info.tracks.map(function (track) {
              var p = download(track.permalink_url, {}, clientID, axiosInstance);
              trackNames.push(track.title);
              return p;
            }));

          case 6:
            result = _context.sent;
            return _context.abrupt("return", [result, trackNames]);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function downloadPlaylist(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/** @internal */
var filterMedia = function filterMedia(media, predicateObj) {
  return media.filter(function (_ref) {
    var format = _ref.format;
    var match = false;
    if (predicateObj.protocol) match = format.protocol === predicateObj.protocol;
    if (predicateObj.format) match = format.mime_type === predicateObj.format;
    return match;
  });
};

/**
 * Audio formats a track can be encoded in.
 */
var FORMATS;

(function (FORMATS) {
  FORMATS["MP3"] = "audio/mpeg";
  FORMATS["OPUS"] = "audio/ogg; codecs=\"opus\"";
})(FORMATS || (FORMATS = {}));
/** @internal */


var _FORMATS = {
  MP3: FORMATS.MP3,
  OPUS: FORMATS.OPUS
};

/** @internal */

var getLikes = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(options, clientID, axiosInstance) {
    var u, response, nextHref, _yield$axiosInstance$, data, query, _response$collection, url;

    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            u = '';

            if (!options.nextHref) {
              if (!options.limit) options.limit = -1;
              if (!options.offset) options.offset = 0;
              u = appendURL("https://api-v2.soundcloud.com/users/" + options.id + "/likes", 'client_id', clientID, 'limit', '' + (options.limit === -1 ? 200 : options.limit), 'offset', '' + options.offset);
            } else {
              u = appendURL(options.nextHref, 'client_id', clientID);
            }

            nextHref = 'start'; // If options.limit > 0, query each page of likes until we have collected
            // `options.limit` liked tracks.
            // If options.limit === -1, query every page of likes

          case 3:
            if (!(nextHref && (options.limit > 0 || options.limit === -1))) {
              _context.next = 25;
              break;
            }

            _context.next = 6;
            return axiosInstance.get(u);

          case 6:
            _yield$axiosInstance$ = _context.sent;
            data = _yield$axiosInstance$.data;
            query = data;

            if (query.collection) {
              _context.next = 11;
              break;
            }

            throw new Error('Invalid JSON response received');

          case 11:
            if (!(query.collection.length === 0)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", data);

          case 13:
            if (!(query.collection[0].kind !== 'like')) {
              _context.next = 15;
              break;
            }

            throw kindMismatchError('like', query.collection[0].kind);

          case 15:
            // Only add tracks (for now)
            query.collection = query.collection.reduce(function (prev, curr) {
              return curr.track ? prev.concat(curr) : prev;
            }, []);

            if (!response) {
              response = query;
            } else {
              (_response$collection = response.collection).push.apply(_response$collection, query.collection);
            }

            if (!(options.limit !== -1)) {
              _context.next = 21;
              break;
            }

            options.limit -= query.collection.length; // We have collected enough likes

            if (!(options.limit <= 0)) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("break", 25);

          case 21:
            nextHref = query.next_href;

            if (nextHref) {
              if (options.limit !== -1) {
                url = new URL(nextHref);
                url.searchParams.set('limit', '' + options.limit);
                nextHref = url.toString();
              }

              u = appendURL(nextHref, 'client_id', clientID);
            }

            _context.next = 3;
            break;

          case 25:
            return _context.abrupt("return", response);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getLikes(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Soundcloud streams tracks using these protocols.
 */
var STREAMING_PROTOCOLS;

(function (STREAMING_PROTOCOLS) {
  STREAMING_PROTOCOLS["HLS"] = "hls";
  STREAMING_PROTOCOLS["PROGRESSIVE"] = "progressive";
})(STREAMING_PROTOCOLS || (STREAMING_PROTOCOLS = {}));
/** @internal */


var _PROTOCOLS = {
  HLS: STREAMING_PROTOCOLS.HLS,
  PROGRESSIVE: STREAMING_PROTOCOLS.PROGRESSIVE
};

/** @internal */

var baseURL = 'https://api-v2.soundcloud.com/search';
var validResourceTypes = ['tracks', 'users', 'albums', 'playlists', 'all'];
/** @internal */

var search = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(options, axiosInstance, clientID) {
    var url, _yield$axiosInstance$, data;

    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = '';
            if (!options.limit) options.limit = 10;
            if (!options.offset) options.offset = 0;
            if (!options.resourceType) options.resourceType = 'tracks';

            if (!options.nextHref) {
              _context.next = 8;
              break;
            }

            url = appendURL(options.nextHref, 'client_id', clientID);
            _context.next = 15;
            break;

          case 8:
            if (!options.query) {
              _context.next = 14;
              break;
            }

            if (validResourceTypes.includes(options.resourceType)) {
              _context.next = 11;
              break;
            }

            throw new Error(options.resourceType + " is not one of " + validResourceTypes.map(function (str) {
              return "'" + str + "'";
            }).join(', '));

          case 11:
            url = appendURL("" + baseURL + (options.resourceType === 'all' ? '' : "/" + options.resourceType), 'client_id', clientID, 'q', options.query, 'limit', '' + options.limit, 'offset', '' + options.offset);
            _context.next = 15;
            break;

          case 14:
            throw new Error('One of options.query or options.nextHref is required');

          case 15:
            _context.next = 17;
            return axiosInstance.get(url);

          case 17:
            _yield$axiosInstance$ = _context.sent;
            data = _yield$axiosInstance$.data;
            return _context.abrupt("return", data);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function search(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/** @internal */

var related = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(id, limit, offset, axiosInstance, clientID) {
    var _yield$axiosInstance$2, data;

    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (limit === void 0) {
              limit = 10;
            }

            if (offset === void 0) {
              offset = 0;
            }

            _context2.next = 4;
            return axiosInstance.get(appendURL("https://api-v2.soundcloud.com/tracks/" + id + "/related", 'client_id', clientID, 'offset', '' + offset, 'limit', '' + limit));

          case 4:
            _yield$axiosInstance$2 = _context2.sent;
            data = _yield$axiosInstance$2.data;
            return _context2.abrupt("return", data);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function related(_x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

/** @internal @packageDocumentation */
var regexp = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
var mobileUrlRegex = /^https?:\/\/(m\.soundcloud\.com)\/(.*)$/; // const firebaseUrlRegex = /^https?:\/\/(soundcloud\.app\.goo\.gl)\/(.*)$/

var firebaseRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,500}\.[a-zA-Z0-9()]{1,500}\b([-a-zA-Z0-9()@:%_+.~#?&//\\=]*)/g;

var isURL = function isURL(url, testMobile, testFirebase) {
  var success = false;

  if (testMobile) {
    if (url.match(mobileUrlRegex)) success = !!url.match(regexp)[2];
  }

  if (!success && testFirebase) {
    if (url.match(firebaseRegexp)) success = !!url.match(firebaseRegexp)[2];
  }

  if (!success && url.match(regexp)) success = !!url.match(regexp)[2];
  return success;
};

var isPlaylistURL = function isPlaylistURL(url) {
  if (!isURL(url)) return false;

  try {
    var u = new URL(url);
    return u.pathname.includes('/sets/');
  } catch (err) {
    return false;
  }
};
var isPersonalizedTrackURL = function isPersonalizedTrackURL(url) {
  if (!isURL(url)) return false;
  return url.includes('https://soundcloud.com/discover/sets/personalized-tracks::');
};
var stripMobilePrefix = function stripMobilePrefix(url) {
  if (!url.includes('m.soundcloud.com')) return url;

  var _url = new URL(url);

  _url.hostname = 'soundcloud.com';
  return _url.toString();
};
var isFirebaseURL = function isFirebaseURL(url) {
  return url.includes('https://soundcloud.app.goo.gl');
};
var convertFirebaseURL = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(url, axiosInstance) {
    var _url, _yield$axiosInstance$, data, matches, firebaseURL;

    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _url = new URL(url);

            _url.searchParams.set('d', '1');

            _context.next = 4;
            return axiosInstance.get(_url.toString());

          case 4:
            _yield$axiosInstance$ = _context.sent;
            data = _yield$axiosInstance$.data;
            matches = data.match(firebaseRegexp);

            if (matches) {
              _context.next = 9;
              break;
            }

            throw new Error("Could not find URL for this SoundCloud Firebase URL: " + url);

          case 9:
            firebaseURL = matches.find(function (match) {
              return regexp.test(match);
            });

            if (firebaseURL) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", undefined);

          case 12:
            return _context.abrupt("return", firebaseURL.replace(/\\u([\d\w]{4})/gi, function (_match, grp) {
              return String.fromCharCode(parseInt(grp, 16));
            }));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function convertFirebaseURL(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/** @internal */

var getUser = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(url, clientID, axiosInstance) {
    var u, _yield$axiosInstance$, data;

    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            u = appendURL(resolveURL, 'url', url, 'client_id', clientID);
            _context.next = 3;
            return axiosInstance.get(u);

          case 3:
            _yield$axiosInstance$ = _context.sent;
            data = _yield$axiosInstance$.data;

            if (data.avatar_url) {
              _context.next = 7;
              break;
            }

            throw new Error('JSON response is not a user. Is profile URL correct? : ' + url);

          case 7:
            return _context.abrupt("return", data);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/** @internal */

var _downloadFormat = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(url, clientID, format, axiosInstance) {
    var info, filtered;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getInfo(url, clientID, axiosInstance);

          case 2:
            info = _context.sent;

            if (info.media) {
              _context.next = 5;
              break;
            }

            throw new Error('No media found');

          case 5:
            filtered = filterMedia(info.media.transcodings, {
              format: format
            });

            if (!(filtered.length === 0)) {
              _context.next = 8;
              break;
            }

            throw new Error("Could not find media with specified format: (" + format + ")");

          case 8:
            _context.next = 10;
            return fromMediaObj(filtered[0], clientID, axiosInstance);

          case 10:
            return _context.abrupt("return", _context.sent);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function downloadFormat(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var SCDL = /*#__PURE__*/function () {
  function SCDL(options) {
    this.STREAMING_PROTOCOLS = _PROTOCOLS;
    this.FORMATS = _FORMATS;
    this._clientID = '';
    this.axios = axios;
    this.saveClientID = process.env.SAVE_CLIENT_ID ? process.env.SAVE_CLIENT_ID.toLowerCase() === 'true' : false;
    if (!options) options = {};

    if (options.saveClientID) {
      this.saveClientID = options.saveClientID;
      if (options.filePath) this._filePath = options.filePath;
    } else {
      if (options.clientID) {
        this._clientID = options.clientID;
      }
    }

    if (options.axiosInstance) {
      this.setAxiosInstance(options.axiosInstance);
    } else {
      this.setAxiosInstance(axios);
    }

    if (!options.stripMobilePrefix) options.stripMobilePrefix = true;
    if (!options.convertFirebaseLinks) options.convertFirebaseLinks = true;
    this.stripMobilePrefix = options.stripMobilePrefix;
    this.convertFirebaseLinks = options.convertFirebaseLinks;
  }
  /**
   * Returns a media Transcoding that matches the given predicate object
   * @param media - The Transcodings to filter
   * @param predicateObj - The desired Transcoding object to match
   * @returns An array of Transcodings that match the predicate object
   */


  var _proto = SCDL.prototype;

  _proto.filterMedia = function filterMedia$1(media, predicateObj) {
    return filterMedia(media, predicateObj);
  }
  /**
   * Get the audio of a given track. It returns the first format found.
   *
   * @param url - The URL of the Soundcloud track
   * @param useDirectLink - Whether or not to use the download link if the artist has set the track to be downloadable. This has erratic behaviour on some environments.
   * @returns A ReadableStream containing the audio data
   */
  ;

  _proto.download =
  /*#__PURE__*/
  function () {
    var _download2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(url, options) {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!options) options = {};
              _context2.t0 = download;
              _context2.next = 4;
              return this.prepareURL(url);

            case 4:
              _context2.t1 = _context2.sent;
              _context2.t2 = options;
              _context2.next = 8;
              return this.getClientID();

            case 8:
              _context2.t3 = _context2.sent;
              _context2.t4 = this.axios;
              _context2.next = 12;
              return (0, _context2.t0)(_context2.t1, _context2.t2, _context2.t3, _context2.t4);

            case 12:
              return _context2.abrupt("return", _context2.sent);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function download$1(_x5, _x6) {
      return _download2.apply(this, arguments);
    }

    return download$1;
  }()
  /**
   *  Get the audio of a given track with the specified format
   * @param url - The URL of the Soundcloud track
   * @param format - The desired format
   */
  ;

  _proto.downloadFormat =
  /*#__PURE__*/
  function () {
    var _downloadFormat2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(url, format) {
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = _downloadFormat;
              _context3.next = 3;
              return this.prepareURL(url);

            case 3:
              _context3.t1 = _context3.sent;
              _context3.next = 6;
              return this.getClientID();

            case 6:
              _context3.t2 = _context3.sent;
              _context3.t3 = format;
              _context3.t4 = this.axios;
              return _context3.abrupt("return", (0, _context3.t0)(_context3.t1, _context3.t2, _context3.t3, _context3.t4));

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function downloadFormat(_x7, _x8) {
      return _downloadFormat2.apply(this, arguments);
    }

    return downloadFormat;
  }()
  /**
   * Returns info about a given track.
   * @param url - URL of the Soundcloud track
   * @returns Info about the track
   */
  ;

  _proto.getInfo =
  /*#__PURE__*/
  function () {
    var _getInfo2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(url) {
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.t0 = getInfo;
              _context4.next = 3;
              return this.prepareURL(url);

            case 3:
              _context4.t1 = _context4.sent;
              _context4.next = 6;
              return this.getClientID();

            case 6:
              _context4.t2 = _context4.sent;
              _context4.t3 = this.axios;
              return _context4.abrupt("return", (0, _context4.t0)(_context4.t1, _context4.t2, _context4.t3));

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getInfo$1(_x9) {
      return _getInfo2.apply(this, arguments);
    }

    return getInfo$1;
  }()
  /**
   * Returns info about the given track(s) specified by ID.
   * @param ids - The ID(s) of the tracks
   * @returns Info about the track
   */
  ;

  _proto.getTrackInfoByID =
  /*#__PURE__*/
  function () {
    var _getTrackInfoByID2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(ids, playlistID, playlistSecretToken) {
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.t0 = getTrackInfoByID;
              _context5.next = 3;
              return this.getClientID();

            case 3:
              _context5.t1 = _context5.sent;
              _context5.t2 = this.axios;
              _context5.t3 = ids;
              _context5.t4 = playlistID;
              _context5.t5 = playlistSecretToken;
              return _context5.abrupt("return", (0, _context5.t0)(_context5.t1, _context5.t2, _context5.t3, _context5.t4, _context5.t5));

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function getTrackInfoByID$1(_x10, _x11, _x12) {
      return _getTrackInfoByID2.apply(this, arguments);
    }

    return getTrackInfoByID$1;
  }()
  /**
   * Returns info about the given set
   * @param url - URL of the Soundcloud set
   * @returns Info about the set
   */
  ;

  _proto.getSetInfo =
  /*#__PURE__*/
  function () {
    var _getSetInfo2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(url) {
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.t0 = getSetInfo;
              _context6.next = 3;
              return this.prepareURL(url);

            case 3:
              _context6.t1 = _context6.sent;
              _context6.next = 6;
              return this.getClientID();

            case 6:
              _context6.t2 = _context6.sent;
              _context6.t3 = this.axios;
              return _context6.abrupt("return", (0, _context6.t0)(_context6.t1, _context6.t2, _context6.t3));

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function getSetInfo$1(_x13) {
      return _getSetInfo2.apply(this, arguments);
    }

    return getSetInfo$1;
  }()
  /**
   * Searches for tracks/playlists for the given query
   * @param options - The search option
   * @returns SearchResponse
   */
  ;

  _proto.search =
  /*#__PURE__*/
  function () {
    var _search2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(options) {
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.t0 = search;
              _context7.t1 = options;
              _context7.t2 = this.axios;
              _context7.next = 5;
              return this.getClientID();

            case 5:
              _context7.t3 = _context7.sent;
              return _context7.abrupt("return", (0, _context7.t0)(_context7.t1, _context7.t2, _context7.t3));

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function search$1(_x14) {
      return _search2.apply(this, arguments);
    }

    return search$1;
  }()
  /**
   * Finds related tracks to the given track specified by ID
   * @param id - The ID of the track
   * @param limit - The number of results to return
   * @param offset - Used for pagination, set to 0 if you will not use this feature.
   */
  ;

  _proto.related =
  /*#__PURE__*/
  function () {
    var _related2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(id, limit, offset) {
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (offset === void 0) {
                offset = 0;
              }

              _context8.t0 = related;
              _context8.t1 = id;
              _context8.t2 = limit;
              _context8.t3 = offset;
              _context8.t4 = this.axios;
              _context8.next = 8;
              return this.getClientID();

            case 8:
              _context8.t5 = _context8.sent;
              return _context8.abrupt("return", (0, _context8.t0)(_context8.t1, _context8.t2, _context8.t3, _context8.t4, _context8.t5));

            case 10:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function related$1(_x15, _x16, _x17) {
      return _related2.apply(this, arguments);
    }

    return related$1;
  }()
  /**
   * Returns the audio streams and titles of the tracks in the given playlist.
   * @param url - The url of the playlist
   */
  ;

  _proto.downloadPlaylist =
  /*#__PURE__*/
  function () {
    var _downloadPlaylist2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(url) {
      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.t0 = downloadPlaylist;
              _context9.next = 3;
              return this.prepareURL(url);

            case 3:
              _context9.t1 = _context9.sent;
              _context9.next = 6;
              return this.getClientID();

            case 6:
              _context9.t2 = _context9.sent;
              _context9.t3 = this.axios;
              return _context9.abrupt("return", (0, _context9.t0)(_context9.t1, _context9.t2, _context9.t3));

            case 9:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function downloadPlaylist$1(_x18) {
      return _downloadPlaylist2.apply(this, arguments);
    }

    return downloadPlaylist$1;
  }()
  /**
   * Returns track information for a user's likes
   * @param options - Can either be the profile URL of the user, or their ID
   * @returns - An array of tracks
   */
  ;

  _proto.getLikes =
  /*#__PURE__*/
  function () {
    var _getLikes2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(options) {
      var id, clientID, user;
      return runtime_1.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return this.getClientID();

            case 2:
              clientID = _context10.sent;

              if (!options.id) {
                _context10.next = 7;
                break;
              }

              id = options.id;
              _context10.next = 27;
              break;

            case 7:
              if (!options.profileUrl) {
                _context10.next = 20;
                break;
              }

              _context10.t0 = getUser;
              _context10.next = 11;
              return this.prepareURL(options.profileUrl);

            case 11:
              _context10.t1 = _context10.sent;
              _context10.t2 = clientID;
              _context10.t3 = this.axios;
              _context10.next = 16;
              return (0, _context10.t0)(_context10.t1, _context10.t2, _context10.t3);

            case 16:
              user = _context10.sent;
              id = user.id;
              _context10.next = 27;
              break;

            case 20:
              if (!options.nextHref) {
                _context10.next = 26;
                break;
              }

              _context10.next = 23;
              return getLikes(options, clientID, this.axios);

            case 23:
              return _context10.abrupt("return", _context10.sent);

            case 26:
              throw new Error('options.id or options.profileURL must be provided.');

            case 27:
              options.id = id;
              return _context10.abrupt("return", getLikes(options, clientID, this.axios));

            case 29:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function getLikes$1(_x19) {
      return _getLikes2.apply(this, arguments);
    }

    return getLikes$1;
  }()
  /**
   * Returns information about a user
   * @param url - The profile URL of the user
   */
  ;

  _proto.getUser =
  /*#__PURE__*/
  function () {
    var _getUser2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee11(url) {
      return runtime_1.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.t0 = getUser;
              _context11.next = 3;
              return this.prepareURL(url);

            case 3:
              _context11.t1 = _context11.sent;
              _context11.next = 6;
              return this.getClientID();

            case 6:
              _context11.t2 = _context11.sent;
              _context11.t3 = this.axios;
              return _context11.abrupt("return", (0, _context11.t0)(_context11.t1, _context11.t2, _context11.t3));

            case 9:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function getUser$1(_x20) {
      return _getUser2.apply(this, arguments);
    }

    return getUser$1;
  }()
  /**
   * Sets the instance of Axios to use to make requests to SoundCloud API
   * @param instance - An instance of Axios
   */
  ;

  _proto.setAxiosInstance = function setAxiosInstance(instance) {
    this.axios = instance;
  }
  /**
   * Returns whether or not the given URL is a valid Soundcloud URL
   * @param url - URL of the Soundcloud track
   */
  ;

  _proto.isValidUrl = function isValidUrl(url) {
    return isURL(url, this.convertFirebaseLinks, this.stripMobilePrefix);
  }
  /**
   * Returns whether or not the given URL is a valid playlist SoundCloud URL
   * @param url - The URL to check
   */
  ;

  _proto.isPlaylistURL = function isPlaylistURL$1(url) {
    return isPlaylistURL(url);
  }
  /**
   * Returns true if the given URL is a personalized track URL. (of the form https://soundcloud.com/discover/sets/personalized-tracks::user-sdlkfjsldfljs:847104873)
   * @param url - The URL to check
   */
  ;

  _proto.isPersonalizedTrackURL = function isPersonalizedTrackURL$1(url) {
    return isPersonalizedTrackURL(url);
  }
  /**
   * Returns true if the given URL is a Firebase URL (of the form https://soundcloud.app.goo.gl/XXXXXXXX)
   * @param url - The URL to check
   */
  ;

  _proto.isFirebaseURL = function isFirebaseURL$1(url) {
    return isFirebaseURL(url);
  };

  _proto.getClientID = /*#__PURE__*/function () {
    var _getClientID = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee12() {
      return runtime_1.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (this._clientID) {
                _context12.next = 3;
                break;
              }

              _context12.next = 3;
              return this.setClientID();

            case 3:
              return _context12.abrupt("return", this._clientID);

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function getClientID() {
      return _getClientID.apply(this, arguments);
    }

    return getClientID;
  }()
  /** @internal */
  ;

  _proto.setClientID =
  /*#__PURE__*/
  function () {
    var _setClientID = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee13(clientID) {
      var filename, c, data;
      return runtime_1.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              if (clientID) {
                _context13.next = 22;
                break;
              }

              if (this._clientID) {
                _context13.next = 21;
                break;
              }

              if (!this.saveClientID) {
                _context13.next = 18;
                break;
              }

              filename = resolve(__dirname, this._filePath ? this._filePath : '../client_id.json');
              _context13.next = 6;
              return this._getClientIDFromFile(filename);

            case 6:
              c = _context13.sent;

              if (c) {
                _context13.next = 15;
                break;
              }

              _context13.next = 10;
              return sckey.fetchKey();

            case 10:
              this._clientID = _context13.sent;
              data = {
                clientID: this._clientID,
                date: new Date().toISOString()
              };
              writeFile(filename, JSON.stringify(data), {}, function (err) {
                if (err) console.log('Failed to save client_id to file: ' + err);
              });
              _context13.next = 16;
              break;

            case 15:
              this._clientID = c;

            case 16:
              _context13.next = 21;
              break;

            case 18:
              _context13.next = 20;
              return sckey.fetchKey();

            case 20:
              this._clientID = _context13.sent;

            case 21:
              return _context13.abrupt("return", this._clientID);

            case 22:
              this._clientID = clientID;
              return _context13.abrupt("return", clientID);

            case 24:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function setClientID(_x21) {
      return _setClientID.apply(this, arguments);
    }

    return setClientID;
  }()
  /** @internal */
  ;

  _proto._getClientIDFromFile =
  /*#__PURE__*/
  function () {
    var _getClientIDFromFile2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee14(filename) {
      return runtime_1.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              return _context14.abrupt("return", new Promise(function (resolve, reject) {
                if (!existsSync(filename)) return resolve('');
                readFile(filename, {
                  encoding: 'utf8'
                }, function (err, data) {
                  if (err) return reject(err);
                  var c;

                  try {
                    c = JSON.parse(data);
                  } catch (err) {
                    return reject(err);
                  }

                  if (!c.date && !c.clientID) {
                    return reject(new Error("Property 'data' or 'clientID' missing from client_id.json"));
                  }

                  if (typeof c.clientID !== 'string') {
                    return reject(new Error("Property 'clientID' is not a string in client_id.json"));
                  }

                  if (typeof c.date !== 'string') {
                    return reject(new Error("Property 'date' is not a string in client_id.json"));
                  }

                  var d = new Date(c.date);

                  if (Number.isNaN(d.getDay())) {
                    return reject(new Error("Invalid date object from 'date' in client_id.json"));
                  }

                  var dayMs = 60 * 60 * 24 * 1000;

                  if (new Date().getTime() - d.getTime() >= dayMs) {
                    // Older than a day, delete
                    unlink(filename, function (err) {
                      if (err) console.log('Failed to delete client_id.json: ' + err);
                    });
                    return resolve('');
                  }

                  return resolve(c.clientID);
                });
              }));

            case 1:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    function _getClientIDFromFile(_x22) {
      return _getClientIDFromFile2.apply(this, arguments);
    }

    return _getClientIDFromFile;
  }()
  /**
   * Prepares the given URL by stripping its mobile prefix (if this.stripMobilePrefix is true)
   * and converting it to a regular URL (if this.convertFireBaseLinks is true.)
   * @param url
   */
  ;

  _proto.prepareURL =
  /*#__PURE__*/
  function () {
    var _prepareURL = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee15(url) {
      var firebaseUrl;
      return runtime_1.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              if (this.stripMobilePrefix) url = stripMobilePrefix(url);

              if (!this.convertFirebaseLinks) {
                _context15.next = 7;
                break;
              }

              if (!isFirebaseURL(url)) {
                _context15.next = 7;
                break;
              }

              _context15.next = 5;
              return convertFirebaseURL(url, this.axios);

            case 5:
              firebaseUrl = _context15.sent;

              if (firebaseUrl) {
                url = firebaseUrl;
              }

            case 7:
              return _context15.abrupt("return", url);

            case 8:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    function prepareURL(_x23) {
      return _prepareURL.apply(this, arguments);
    }

    return prepareURL;
  }();

  return SCDL;
}(); // SCDL instance with default configutarion

var scdl = /*#__PURE__*/new SCDL(); // Creates an instance of SCDL with custom configuration

var create = function create(options) {
  return new SCDL(options);
};
scdl.STREAMING_PROTOCOLS = _PROTOCOLS;
scdl.FORMATS = _FORMATS;

export default scdl;
export { SCDL, create };
//# sourceMappingURL=soundcloud-downloader.esm.js.map
