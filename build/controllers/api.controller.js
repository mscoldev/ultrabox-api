"use strict";

var _require = require('express'),
    response = _require.response,
    request = _require.request;

var apiGet = function apiGet() {
  var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : request;
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : response;
  res.json({});
};

module.exports = {
  apiGet: apiGet
};