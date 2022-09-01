const { Router } = require('express');
const multer  = require('multer')
const router = Router();
const { Op } = require('sequelize');
const body_parser = require('body-parser');
const upload = multer({ dest: 'uploads/' })


// 모델 불러오기
const { users, board, users_token } = require('../database/models');
import security from '../utils/security';
import jwt_utils from '../utils/jwt_utils';

router.post('/sign_up', async function (req, res, next) {
    // 콜백에 req, res, next
    // 구조 분해 할당
    const { email, name, phone } = req.body;
    try {
        const { password, salt } = await security.pbkdf2AsyncNonSalt(
            req.body.password
        );
        // console.log('pass encode : '+password)
        // console.log('pass decode : '+req.body.password)
        // console.log('salt : '+salt)
        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        await users.create({
            email,
            password,
            name,
            phone,
            salt_key: salt,
        });
        // end는 요청을 끝내겠다. (클라이언트에게 리턴값을 주겠다.)
        return res.status(200).end();
    } catch (e) {
        return next(e);
    }
});

router.post('/sign_in', async function (req, res, next) {
    const { email, automation } = req.body;
    try {
        const user = await users.findOne({
            where: {
                email,
            },
            attributes: { exclude: ['access_token', 'refresh_token'] },
        });

        if (!user) {
            throw new Error('CANNOT FOUND USER');
        }

        const { password } = await security.pbkdf2Async(
            user.salt_key,
            req.body.password
        );

        if (password != user.password) {
            throw new Error('Wrong Password');
        }

        const token = jwt_utils.create_token({
            id: user.id,
            name: user.name,
            email: user.email,
            automation,
        });
        const ip_address =
            req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(ip_address); // ip address of the user

        const user_token = await users_token.findOne({
            where: {
                user_id: user.id,
            },
        });

        if (user_token) {
            await users_token.update(
                {
                    access_token: token.access_token,
                    refresh_token: token.refresh_token,
                },
                {
                    where: {
                        user_id: user.id,
                    },
                }
            );
        } else {
            await users_token.create({
                access_token: token.access_token,
                refresh_token: token.refresh_token,
                automation,
                ip_address,
                user_id: user.id,
            });
        }

        const data = {
            id: user.id,
            name: user.name,
            access_token: token.access_token,
            refresh_token: token.refresh_token,
        };

        return res.status(200).json(data);
    } catch (e) {
        return next(e);
    }
});

router.post('/logout', async function (req, res, next) {
    try {
        const logout_result = users_token.destroy({
            where: {
                refresh_token: req.body.refresh_token,
            },
        });
        console.log(logout_result);
        return res.status(200).end();
    } catch (e) {
        console.log(e);
        return next(e);
    }
});

router.post(
    '/board_upload',
    jwt_utils.token_check,
    async function (req, res, next) {
        const { content, user_id } = req.body;
        try {
            await board.create({
                content,
                user_id,
            });
            return res.status(200).end();
        } catch (e) {
            return next(e);
        }
    }
);

router.get(
    '/board/:user_id',
    jwt_utils.token_check,
    async function (req, res, next) {
        const { user_id } = req.params;
        console.log(user_id);
        try {
            const result = await board.findAll({
                where: {
                    user_id,
                },
            });
            return res.status(200).json({ result });
        } catch (e) {
            return next(e);
        }
    }
);

router.delete(
    '/board/:board_id',
    jwt_utils.token_check,
    async function (req, res, next) {
        const { board_id } = req.params;
        try {
            const result = await board.destroy({
                where: {
                    id: board_id,
                },
            });
            return res.status(200).json({ result });
        } catch (e) {
            return next(e);
        }
    }
);

router.post(
    '/test_token_check',
    jwt_utils.token_check,
    async function (req, res, next) {
        console.log(jwt_utils.token_check);

        return res.end();
    }
);

const file = upload.fields([{name : 'file', maxCount: 1}])

router.post('/file_upload', file, async function (req, res, next) {
    // const {file} = req.body;
    console.log(req);
    console.log(req.body);
    // console.log(req.body.form_data);
    // console.log(JSON.parse(req.files));
    console.log(req.files,'파일 받음?');
    return
    try {
        // console.log(file);
    } catch (e) {
        console.error(e);
    }
});

// 라우터를 작성한 후 익스포트를 밖으로 내보내줘야 app.js에서 불러들였을때 이런 설정 내용들을 읽을수 있다.
module.exports = router;
