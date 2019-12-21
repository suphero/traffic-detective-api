const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config");
const User = require("../models/user");
const helpers = require('../helpers');

async function signup(email, password) {
    checkEmail(email);
    checkPassword(password);
    const dbUser = await User.findOne({ email: email });
    if (dbUser) { throw new Error('Kullanıcı mevcut.'); }
    const hash = bcrypt.hashSync(password, 10);
    const user = new User({
        email: email,
        password: hash
    });
    await user.save();
    return login(email, password);
};

async function login(email, password) {
    checkEmail(email);
    const user = await User.findOne({ email: email });
    if (!user) { throw new Error('Kullanıcı bulunamadı.'); }
    const result = bcrypt.compareSync(password, user.password);
    if (!result) { throw new Error('Şifre hatalı.'); }
    const JWTToken = jwt.sign({
        email: user.email,
        _id: user._id
    },
    config.secret, {
        expiresIn: config.expiresIn
    });
    return { token: JWTToken, success: true };
};

function verifyToken(token) {
    jwt.verify(token, config.secret);
    return { success: true };
}

async function profile(userId){
    const user = await User.findById(userId);
    return { success: true, user: user };
};

function checkEmail(email) {
    var isValid = helpers.validateEmail(email);
    if (!isValid) { throw new Error('E-Posta geçersiz.'); }
}

function checkPassword(password) {
    var score = helpers.scorePassword(password);
    if (score < 50) { throw new Error('Lütfen daha güçlü bir şifre seçin.'); }
}

module.exports = {
    signup,
    login,
    verifyToken,
    profile
};