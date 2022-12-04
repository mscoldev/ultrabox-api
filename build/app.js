"use strict";

require('dotenv').config();

var Server = require('./models/server.model');

var server = new Server();
server.listen();