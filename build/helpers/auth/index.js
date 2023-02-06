"use strict";

var passport = require('passport');

var LocalStrategy = require('../../helpers/auth/strategies/local.strategy');

var JwtStrategy = require('../../helpers/auth/strategies/jwt.strategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);