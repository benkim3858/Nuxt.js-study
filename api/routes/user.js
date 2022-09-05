const {Router} = require('express');
const multer = require('multer')
const router = Router();
const xlsx = require('xlsx');
const {Op} = require('sequelize');


// 모델 불러오기
const {users, board, users_token, file} = require('../database/models');
import security from '../utils/security';
import jwt_utils from '../utils/jwt_utils';
import upload_path from '../utils/multer-local';

/**
 * multer 모듈을 사용할 때 사용할 옵션들을 추가하는것
 * 기본 옵션인 dest 는 파일을 저장할 위치를 지정하는것이다.
 * uploads 폴더가 없다면 멀터가 알아서 생성해줌
 * */

router.post('/file_upload', upload_path, async function (req, res, next) {
    console.log(req.files);
    console.log(req.files[0].originalname);
    console.log(req.files[0].path);
    const file_url = req.files[0].path;
    const file_name = req.files[0].filename;

    try {
        let result = await file.create({
            file_url,
            file_name,
        })

        await result.save();

        return res.status(200).end();
    } catch (e) {
        console.error(e);
    }
});

router.get('/get_file', async function (req, res, next) {
    try {
        const result = await file.findAll({
            attributes: ['file_name', 'file_url'],
        });
        console.log(result);
        let name = result.map(item => {
            return item.file_name
        })
        console.log(name, ' : name')

        const excel_file = xlsx.readFile(result.map(item => {
            return item.file_url
        }).toString());
        console.log(excel_file);

        const sheet_name = excel_file.SheetNames;
        console.log(sheet_name, '=============Sheet Name============');

        const sheet = excel_file.Sheets[sheet_name];
        console.log(sheet);

        const json_data = xlsx.utils.sheet_to_json(sheet);
        console.log(json_data);

        let res_data = json_data.map(item => {
            return {
                res_data : {
                    name : item.__EMPTY,
                    content : item.URL,
                    test_id : item.PW,
                }
            }
        })

        console.log( res_data);

        return res.status(200).send(res_data);
    } catch (e) {
        console.error(e);
    }
}),

    router.post('/sign_up', async function (req, res, next) {
        // 콜백에 req, res, next
        // 구조 분해 할당
        const {email, name, phone} = req.body;
        try {
            const {password, salt} = await security.pbkdf2AsyncNonSalt(
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
    }),

    router.post('/sign_in', async function (req, res, next) {
        const {email, automation} = req.body;
        try {
            const user = await users.findOne({
                where: {
                    email,
                },
                attributes: {exclude: ['access_token', 'refresh_token']},
            });

            if (!user) {
                throw new Error('CANNOT FOUND USER');
            }

            const {password} = await security.pbkdf2Async(
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
        const {content, user_id} = req.body;
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
        const {user_id} = req.params;
        console.log(user_id);
        try {
            const result = await board.findAll({
                where: {
                    user_id,
                },
            });
            return res.status(200).json({result});
        } catch (e) {
            return next(e);
        }
    }
);

router.delete(
    '/board/:board_id',
    jwt_utils.token_check,
    async function (req, res, next) {
        const {board_id} = req.params;
        try {
            const result = await board.destroy({
                where: {
                    id: board_id,
                },
            });
            return res.status(200).json({result});
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


// 라우터를 작성한 후 익스포트를 밖으로 내보내줘야 app.js에서 불러들였을때 이런 설정 내용들을 읽을수 있다.
module.exports = router;
