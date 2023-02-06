const passport = require('passport');

const LocalStrategy = require('../../helpers/auth/strategies/local.strategy');
const JwtStrategy = require('../../helpers/auth/strategies/jwt.strategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);