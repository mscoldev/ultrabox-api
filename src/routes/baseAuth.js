
function baseAuth(NAME_MODULE) {
    const passport = require('passport');
    const { authorize } = require('../middlewares/validateOperation');

    return [passport.authenticate('jwt', { session: false }), authorize(NAME_MODULE)];
}

module.exports = baseAuth;