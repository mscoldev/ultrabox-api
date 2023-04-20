"use strict";

var _require = require('passport-jwt'),
    Strategy = _require.Strategy,
    ExtractJwt = _require.ExtractJwt;

require('dotenv').config();

var options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
  ignoreExpired: false
};
var JwtStrategy = new Strategy(options, function (payload, done) {
  return done(null, payload);
});
module.exports = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map