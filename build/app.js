"use strict";

var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('dotenv').config();

var Server = require('./models/server.model');

var server = new Server();
server.app.set('pkg', _package["default"]);
console.log(_package["default"]);
server.app.get('/api', function (req, res) {
  res.json({
    app: server.app.get('pkg').name,
    author: server.app.get('pkg').author,
    description: server.app.get('pkg').description,
    version: server.app.get('pkg').version,
    url_docs: server.app.get('pkg').url_docs
  });
});
server.listen();