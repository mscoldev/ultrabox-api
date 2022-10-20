"use strict";

var _require = require('express'),
    response = _require.response,
    request = _require.request;

var userGet = function userGet() {
  var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : request;
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : response;
  var _req$query = req.query,
      q = _req$query.q,
      _req$query$nombre = _req$query.nombre,
      nombre = _req$query$nombre === void 0 ? 'No name' : _req$query$nombre,
      apikey = _req$query.apikey,
      _req$query$page = _req$query.page,
      page = _req$query$page === void 0 ? 1 : _req$query$page,
      limit = _req$query.limit;
  res.json({
    msg: 'get API - controlador',
    q: q,
    nombre: nombre,
    apikey: apikey,
    page: page,
    limit: limit
  });
};

var userPost = function userPost(req) {
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : response;
  var _req$body = req.body,
      nombre = _req$body.nombre,
      edad = _req$body.edad;
  res.json({
    msg: 'post API - userPost',
    nombre: nombre,
    edad: edad
  });
};

var userPut = function userPut(req) {
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : response;
  var id = req.params.id;
  res.json({
    msg: 'put API - userPut',
    id: id
  });
};

var userPatch = function userPatch(req) {
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : response;
  res.json({
    msg: 'patch API - userPatch'
  });
};

var userDelete = function userDelete(req) {
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : response;
  res.json({
    msg: 'delete API - userDelete'
  });
};

module.exports = {
  userGet: userGet,
  userPost: userPost,
  userPut: userPut,
  userPatch: userPatch,
  userDelete: userDelete
};