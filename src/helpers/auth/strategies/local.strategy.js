const { Strategy } = require('passport-local')
const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs')
const User = require('../../../models/user.model');


const LocalStrategy = new Strategy(async (username, password, done) => {
    try {
        const findUser = await User.findOne({ username: username })
        if (findUser == null) {
            done(boom.unauthorized(), false)
        }
        const isMatch = await bcrypt.compare(password, findUser.password);
        if (!isMatch) {
            done(boom.unauthorized(), false)
        }
        done(null, findUser)

    } catch (error) {
        done(error, false);
    }
});


module.exports = LocalStrategy