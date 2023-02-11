"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('express'),
    response = _require.response,
    request = _require.request;

var Material = require("../../models/material.model");

var boom = require('@hapi/boom');

var _require2 = require('mongoose'),
    mongoose = _require2.mongoose;

var _require3 = require('sequelize'),
    col = _require3.col;

var getMaterials = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var req,
        res,
        materials,
        _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _args.length > 0 && _args[0] !== undefined ? _args[0] : request;
            res = _args.length > 1 && _args[1] !== undefined ? _args[1] : response;
            _context.prev = 2;
            _context.next = 5;
            return Material.find({
              "deleted": false
            }).populate([{
              path: 'productionLineUse',
              model: 'ProductionLine',
              options: {
                lean: true
              },
              select: {
                name: 1
              }
            }]).exec();

          case 5:
            materials = _context.sent;
            res.status(200).json({
              msg: 'List of materials',
              materials: materials
            });
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", res.status(500).json({
              message: _context.t0.message
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));

  return function getMaterials() {
    return _ref.apply(this, arguments);
  };
}(); //TODO: Implementar verificacion de tipo de datos al realizar busquedas por ID.


var getMaterialsById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var req,
        res,
        next,
        material,
        _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            req = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : request;
            res = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : response;
            next = _args2.length > 2 ? _args2[2] : undefined;
            _context2.prev = 3;
            _context2.next = 6;
            return Material.findById(req.params.materialId);

          case 6:
            material = _context2.sent;

            if (!(material != null)) {
              _context2.next = 11;
              break;
            }

            res.status(200).json({
              msg: 'Material por Id',
              material: material
            });
            _context2.next = 12;
            break;

          case 11:
            throw boom.notFound('Material not found');

          case 12:
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](3);
            next(_context2.t0);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 14]]);
  }));

  return function getMaterialsById() {
    return _ref2.apply(this, arguments);
  };
}();

var getMaterialsByLine = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var req,
        res,
        next,
        productionLineUse,
        arrayProductionLineUse,
        objectIdArray,
        material,
        _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            req = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : request;
            res = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : response;
            next = _args3.length > 2 ? _args3[2] : undefined;
            _context3.prev = 3;
            productionLineUse = req.query.productionLineUse;
            arrayProductionLineUse = productionLineUse.split(",");
            objectIdArray = arrayProductionLineUse.map(function (id) {
              return mongoose.Types.ObjectId(id);
            });
            console.log(objectIdArray);
            _context3.next = 10;
            return Material.find({
              'productionLineUse': {
                $in: objectIdArray
              }
            }).populate([{
              path: 'productionLineUse',
              model: 'ProductionLine',
              options: {
                lean: true
              },
              select: {
                name: 1
              }
            }]).exec();

          case 10:
            material = _context3.sent;

            if (!(material != null)) {
              _context3.next = 15;
              break;
            }

            res.status(200).json({
              msg: 'Materiales por linea de produccion',
              material: material
            });
            _context3.next = 16;
            break;

          case 15:
            throw boom.notFound('Material no encontrado');

          case 16:
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](3);
            next(_context3.t0);

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 18]]);
  }));

  return function getMaterialsByLine() {
    return _ref3.apply(this, arguments);
  };
}();

var updateMaterialById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var req,
        res,
        paramsId,
        body,
        updatedMaterial,
        _args4 = arguments;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            req = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : request;
            res = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : response;
            _context4.prev = 2;
            paramsId = req.params.materialId;
            body = req.body;
            _context4.next = 7;
            return Material.findByIdAndUpdate(paramsId, body, {
              "new": true
            });

          case 7:
            updatedMaterial = _context4.sent;

            if (updatedMaterial != null) {
              res.status(200).json({
                msg: 'Material actualizado por Id',
                updatedMaterial: updatedMaterial
              });
            } else {
              res.status(404).json({
                msg: 'Material no encontrado, verifique el Id ingresado'
              });
            }

            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](2);
            return _context4.abrupt("return", res.status(500).json({
              message: _context4.t0.message
            }));

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 11]]);
  }));

  return function updateMaterialById() {
    return _ref4.apply(this, arguments);
  };
}();

var deleteMaterialById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var req,
        res,
        paramsId,
        body,
        deletedMaterial,
        errMsg,
        _args5 = arguments;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            req = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : request;
            res = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : response;
            _context5.prev = 2;
            paramsId = req.params.materialId;
            body = {
              deleted: true
            };
            _context5.next = 7;
            return Material.findByIdAndUpdate(paramsId, body);

          case 7:
            deletedMaterial = _context5.sent;

            if (deletedMaterial != null) {
              res.status(202).json({
                msg: 'Material eliminado Id:' + paramsId
              });
            } else {
              res.status(404).json({
                msg: 'Material no encontrado, verifique el Id ingresado'
              });
            }

            _context5.next = 15;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](2);

            // Set custom error for unique keys
            if (_context5.t0.code == 11000) {
              errMsg = Object.keys(_context5.t0.keyValue)[0] + " already exists.";
            } else {
              errMsg = _context5.t0.message;
            }

            res.status(400).json({
              statusText: "Bad Request",
              message: errMsg
            });

          case 15:
            ;

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 11]]);
  }));

  return function deleteMaterialById() {
    return _ref5.apply(this, arguments);
  };
}();

var createMaterial = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var req,
        res,
        body,
        material,
        materialSaved,
        _args6 = arguments;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            req = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : request;
            res = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : response;
            _context6.prev = 2;
            body = req.body;
            console.log(body);
            material = new Material(body);
            _context6.next = 8;
            return material.save();

          case 8:
            materialSaved = _context6.sent;
            res.status(201).json({
              msg: 'Material created successfully',
              materialSaved: materialSaved
            });
            _context6.next = 15;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](2);
            return _context6.abrupt("return", res.status(500).json({
              message: _context6.t0.message
            }));

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 12]]);
  }));

  return function createMaterial() {
    return _ref6.apply(this, arguments);
  };
}();

module.exports = {
  createMaterial: createMaterial,
  getMaterials: getMaterials,
  getMaterialsById: getMaterialsById,
  getMaterialsByLine: getMaterialsByLine,
  updateMaterialById: updateMaterialById,
  deleteMaterialById: deleteMaterialById
};