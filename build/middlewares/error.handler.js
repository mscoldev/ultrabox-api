"use strict";

function logErrors(err, req, res, next) {
  console.log("*******LOG ERROR********");
  console.error(err.stack);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log("*****ERROR HANDLER********");
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