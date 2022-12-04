"use strict";

require('dotenv').config();

var Server = require('./models/server.model');

var pkg = require('../package.json');

var server = new Server();
server.listen();
server.app.set('pkg', pkg);
console.log(pkg);
server.app.get('/api', function (req, res) {
  res.json({
    app: server.app.get('pkg').name,
    author: server.app.get('pkg').author,
    description: server.app.get('pkg').description,
    version: server.app.get('pkg').version,
    url_docs: server.app.get('pkg').url_docs
  });
});