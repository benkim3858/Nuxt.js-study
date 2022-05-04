const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;
const {users,board,users_token} = require('../database/models');
const jwt_utils = {};

jwt_utils.token_check = function(req, res, next) {
    const token = req.headers['x-access-token']; // 헤더에 담겨있는 x-access-token 가져온다
    console.log("====== URL : " + req.baseUrl + req.path + " ===== TOKEN : ", token ? "OK" : "NULL")

    if(!token) {
        return res.status(401).send('token require'); // 401 에러 뜻 : unauthorized 인증되지 않음
    } else {
        // jwt의 내장 메소드
        try {
            let decoded = jwt.verify(token, secret_key)
            req.decoded = decoded;
            console.log("====== USER_ID : " + decoded)
            next();
        } catch (e) {
            console.log(e)
            return res.status(401).send('token expired');
        }
    }
}

jwt_utils.create_token = function({id, email, name, automation}) {
    try {
        // 네트워크 통신에서 송수신 되는 데이터(내용)를 payload라고 한다.
        let payload = {
            id,
            email,
            name,
        };

        let access_options = {
            algorithm: "HS512",
            expiresIn: "15m",
        };

        let refresh_options = {
            algorithm: "HS512",
            expiresIn: automation ? "30 days" : "2h"
        };
        console.log(refresh_options);
        const access_token = jwt.sign(payload, secret_key, access_options);
        const refresh_token = jwt.sign(payload, secret_key, refresh_options);

        if(access_token && refresh_token) {
            const token = {
                access_token,
                refresh_token,
            }
            return token;
        }
    } catch (e) {
        console.log(e);
        throw new Error("TOKEN CREATE ERROR")       
    }
}

jwt_utils.refresh_token = async function(req, res, next) {
    console.log("refresh token");

    let refresh_token = req.headers['x-refresh-token']
    let access_token = req.headers['x-access-token']

    if(!access_token) {
        return res.status(401).send('x-access-token is required');
    }
    if(!refresh_token) {
        return res.status(401).send('x-refresh-token is required');
    }

    try {
        const access_token_decoded = jwt.verify(access_token, secret_key);
        res.status(201).send({token : {
            refresh_token,
            access_token,
        }, access_token_decoded});
        return;
    } catch (e) {
        console.log("access_token 만료 ");
        console.log("refresh 체크 시작 ");
        try {
            const refresh_token_decoded = jwt.verify(refresh_token, secret_key)
            let user_token = await users_token.findOne({
                where : {
                    user_id : refresh_token_decoded.id,
                    refresh_token,
                }
            })
            if(!user_token) {
                res.status(401).send('not found user');
                return;
            }
            if(user_token.access_token != access_token) {
                res.status(401).send('TOKEN FORGERY');
                return;
            }

            const token = jwt_utils.create_token({
                id : refresh_token_decoded.id,
                automation : user_token.automation,
            });

            user_token.refresh_token = token.refresh_token;
            user_token.access_token = token.access_token;
            user_token.save();

            res.status(201).send(token);
            return

        } catch (e) {
            let user_token = await users_token.destory({
                where : {
                    refresh_token
                }
            })
            res.status(401).send('REFRESH TOKEN IS EXPIRED');
        }
    }
}

export default jwt_utils;