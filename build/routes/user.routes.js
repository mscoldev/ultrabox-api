"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/user.controller'),
    userGet = _require2.userGet,
    userPut = _require2.userPut,
    userPost = _require2.userPost,
    userDelete = _require2.userDelete,
    userPatch = _require2.userPatch;

var router = Router();
router.get('/', userGet);
router.put('/:id', userPut);
router.post('/', userPost);
router["delete"]('/', userDelete);
router.patch('/', userPatch);
module.exports = router;