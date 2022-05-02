const sequelize = require('../database/models').sequelize;
const { Op } = require('sequelize');
const crypto = require("crypto");
const users = require('../database/models').users;

let utils = {};

// 회원가입 단방향 암호화
utils.pbkdf2AsyncNonSalt = function(password) {
    return new Promise((res, rej) => {
        crypto.randomBytes(64, (err, buf) => {
            crypto.pbkdf2(password, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
                err ? rej(err) : res({ password: key.toString('base64'), salt: buf.toString('base64') });
            });
        });
    });
},

// 로그인 암호 대조
utils.pbkdf2Async = function(salt, password) {
    return new Promise((res, rej) => {
        crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
            err ? rej(err) : res({ password: key.toString('base64'), salt: salt });
        });
    });
}

export default utils;