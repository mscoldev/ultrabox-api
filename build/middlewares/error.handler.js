"use strict";

function logErrors(err, req, res, next) {
  console.log("*******LOG ERROR********");
  console.error(err.message);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log("*****ERROR HANDLER********");

  if (err.code === 11000) {
    var message = "El valor ".concat(err.keyValue.name, " ya existe en la base de datos");
    console.log({
      err: err
    });
    return res.status(409).json({
      message: message
    });
  }

  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler(err, req, res, next) {
  console.log("*******BOOM ERROR HANDLER********");

  if (err.isBoom === true) {
    console.log(err);
    var output = err.output;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

module.exports = {
  logErrors: logErrors,
  errorHandler: errorHandler,
  boomErrorHandler: boomErrorHandler
};
//# sourceMappingURL=error.handler.js.map