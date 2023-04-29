"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _ = require('lodash');

var PjAcceptance = require('../../../models/projects/acceptance.model');

var updateDynamicAcceptance = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_id, signatory, serviceValue, recommendations) {
    var _data, lastStage, updatedAcceptance, updateStepOne, updateStepTwo, _updateStepThree, updateStepThree;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return readAcceptanceById(_id);

          case 3:
            _data = _context.sent;
            console.log({
              data: _data
            }); //Ultimo estado reportado

            _context.next = 7;
            return getLastStageName(_data);

          case 7:
            lastStage = _context.sent;
            console.log({
              lastStage: lastStage
            }); //Evaluar los Stage y actualizar según el Stage

            _context.t0 = lastStage;
            _context.next = _context.t0 === 'new' ? 12 : _context.t0 === 'signedByContractor' ? 19 : _context.t0 === 'signedByClient' ? 31 : 36;
            break;

          case 12:
            updateStepOne = {
              $set: {
                'signatory.contractor': signatory.contractor
              },
              $push: {
                stage: {
                  name: 'signedByContractor',
                  completed: true
                }
              }
            };
            console.log({
              updateStepOne: updateStepOne
            });
            _context.next = 16;
            return setAcceptanceById(_id, updateStepOne);

          case 16:
            updatedAcceptance = _context.sent;
            console.log({
              updatedAcceptance: updatedAcceptance
            }); //Envía un correo al cliente con los datos para actualizar

            return _context.abrupt("break", 38);

          case 19:
            updateStepTwo = {
              $set: {
                'signatory.client': signatory.client,
                serviceValue: serviceValue,
                recommendations: recommendations
              },
              $push: {
                stage: {
                  name: 'signedByClient',
                  completed: true
                }
              }
            };
            _context.next = 22;
            return setAcceptanceById(_id, updateStepTwo);

          case 22:
            updatedAcceptance = _context.sent;

            if (!(_data.typeAcceptance === 'Parcial')) {
              _context.next = 26;
              break;
            }

            _context.next = 30;
            break;

          case 26:
            //Se empuja el estado de cerrado.
            _updateStepThree = {
              $push: {
                stage: {
                  name: 'closed',
                  completed: true
                }
              }
            };
            _context.next = 29;
            return setAcceptanceById(_id, _updateStepThree);

          case 29:
            updatedAcceptance = _context.sent;

          case 30:
            return _context.abrupt("break", 38);

          case 31:
            //Se debe enviar una aceptación de los pendientes
            updateStepThree = {
              $push: {
                stage: {
                  name: 'closed',
                  completed: true
                }
              }
            };
            _context.next = 34;
            return setAcceptanceById(_id, updateStepThree);

          case 34:
            updatedAcceptance = _context.sent;
            return _context.abrupt("break", 38);

          case 36:
            console.log('No se encontró ningún stage con ese nombre');
            result = 'No se encontró ningún stage con ese nombre';

          case 38:
            return _context.abrupt("return", updatedAcceptance);

          case 41:
            _context.prev = 41;
            _context.t1 = _context["catch"](0);
            return _context.abrupt("return", _context.t1);

          case 44:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 41]]);
  }));

  return function updateDynamicAcceptance(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var setAcceptanceById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_id, update) {
    var updateAcceptance;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            console.log("id para setAccep ".concat(_id));
            _context2.next = 4;
            return PjAcceptance.findByIdAndUpdate(_id, update, {
              "new": true
            });

          case 4:
            updateAcceptance = _context2.sent;

            if (!(updateAcceptance != null)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", updateAcceptance);

          case 9:
            throw boom.notFound("Oops!, acta con _id:".concat(_id, ", no encontrada"));

          case 10:
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", _context2.t0);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function setAcceptanceById(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var readAcceptanceById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_id) {
    var acceptance;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return PjAcceptance.findById(_id);

          case 3:
            acceptance = _context3.sent;

            if (!(acceptance != null)) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", acceptance);

          case 8:
            throw boom.notFound("Oops!, acta con _id:".concat(_id, ", no encontrada"));

          case 9:
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", _context3.t0);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));

  return function readAcceptanceById(_x7) {
    return _ref3.apply(this, arguments);
  };
}();

var findSomeStageComplete = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data, someStageName) {
    var existingStageComplete, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // const data = await readAcceptanceById(_id);
            existingStageComplete = data.stage.some(function (stageSome) {
              return stageSome.name === someStageName && stageSome.completed === true;
            });
            console.log("Se encontr\xF3 el estado ".concat(someStageName, " completo en el array"));
            result = existingStageComplete === true ? someStageName : false;
            return _context4.abrupt("return", result);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function findSomeStageComplete(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

var updateSelectionStage = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_id, stage) {
    var data, confirmStage;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return readAcceptanceById(_id);

          case 2:
            data = _context5.sent;
            _context5.next = 5;
            return findSomeStageComplete(data, stage);

          case 5:
            confirmStage = _context5.sent;
            return _context5.abrupt("return", confirmStage);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function updateSelectionStage(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

var getLastStageName = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(data) {
    var stages;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            stages = _.orderBy(data.stage, ['date'], ['desc']);
            return _context6.abrupt("return", stages.length > 0 ? stages[0].name : null);

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getLastStageName(_x12) {
    return _ref6.apply(this, arguments);
  };
}();

var data = {
  _id: {
    $oid: '643c3c15ae1896e1e634dbb7'
  },
  _codeProjectERP: 'PJ2203-0112',
  _idProjectERP: 32,
  dateAcceptance: {
    $date: '2023-01-28T01:00:00Z'
  },
  serviceObject: 'Asistencia tecnica para la instalacion de 5 alarmas',
  dateInit: {
    $date: '2023-01-28T01:00:00Z'
  },
  dateEnd: {
    $date: '2023-01-28T01:00:00Z'
  },
  erpRef: {
    client: {
      purchaseOrder: 'oc123456789'
    },
    own: {
      proposal: 'OF12334567890'
    }
  },
  client: {
    company: 'ULTRACEM',
    Name: 'Pedro Perez',
    Position: 'Jefe de Compras',
    Email: 'perdro.perez@prueba.com'
  },
  controller: {
    Position: 'No especificado'
  },
  contractor: {
    Name: 'Pedro Perez',
    Position: 'Jefe de Compras',
    Email: 'perdro.perez@prueba.com'
  },
  deliverables: [{
    _id: 'uuid',
    description: 'Este es entregable 1',
    compliance: 100,
    accepted: true
  }, {
    _id: 'uuid',
    description: 'Este es entregable 2',
    compliance: 100,
    accepted: true
  }],
  citySign: 'Barranquilla',
  officeSign: 'el cliente',
  serviceValue: 5,
  recommendations: 'Estas son nuestras recomendaciones',
  typeAcceptance: 'Total',
  stage: [{
    name: 'new',
    date: {
      $date: '2023-04-16T18:19:01.177Z'
    },
    completed: false,
    _id: {
      $oid: '643c3c15ae1896e1e634dbb8'
    }
  }, {
    name: 'rejected',
    date: {
      $date: '2023-04-16T18:19:01.177Z'
    },
    completed: true,
    _id: {
      $oid: '643c3c15ae1896e1e634dbb8'
    }
  }],
  _idFiles: [],
  dateSign: {
    $date: '2023-04-16T18:19:01.186Z'
  },
  rejectedMessage: [],
  createdAt: {
    $date: '2023-04-16T18:19:01.191Z'
  },
  updatedAt: {
    $date: '2023-04-16T18:19:01.191Z'
  }
};
module.exports = {
  updateDynamicAcceptance: updateDynamicAcceptance,
  setAcceptanceById: setAcceptanceById,
  findSomeStageComplete: findSomeStageComplete,
  getLastStageName: getLastStageName
};
//# sourceMappingURL=stages.js.map