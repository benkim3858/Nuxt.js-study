const { Router } = require('express');
const router = Router();
const { Op } = require("sequelize");

// 모델 불러오기
const {users,board} = require('../database/models');
import security from '../utils/security'


router.post('/sign_up', async function(req, res, next){ // 콜백에 req, res, next
    // 구조 분해 할당
    const {email, name, phone} = req.body;
    try {
        const {password, salt} = await security.pbkdf2AsyncNonSalt(req.body.password);
        // console.log('pass encode : '+password)
        // console.log('pass decode : '+req.body.password)
        // console.log('salt : '+salt)
        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        await users.create({
            email,
            password,
            name,
            phone,
            salt_key : salt,
        })
        // end는 요청을 끝내겠다. (클라이언트에게 리턴값을 주겠다.)
        return res.status(200).end();
    } catch (e) {
        return next(e)
    }
});

router.post('/sign_in', async function(req, res, next){
    const {email} = req.body;
    try {
        const result = await users.findOne({
            where: {
                email,
            }
        })

        // console.log('db pass : '+result.password)
        // console.log('req pass : '+req.body.password)
        // console.log('db salt : '+result.salt)
        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

        const { password } = await security.pbkdf2Async(result.salt_key, req.body.password);
        // console.log(password);
        // console.log(result.password);
            if (password != result.password) {
                throw new Error('Not Found User');
            }
        return res.status(200).json({ result });
    } catch (e) {
        return next(e);
    }
});

router.post('/board_upload', async function(req, res, next){
    const {content, user_id} = req.body;
    try {
        await board.create({
            content,
            user_id,
        })
        return res.status(200).end();
    } catch (e) {
        return next(e);
    }
});

router.get('/board/:user_id', async function(req, res, next){
    const {user_id} = req.params;
    console.log(user_id);
    try {
        const result = await board.findAll({
            where: {
                user_id
            }
        })
        return res.status(200).json({ result });
    } catch (e) {
        return next(e);
    }
})

router.delete('/board/:board_id', async function(req, res, next){
    const {board_id} = req.params;
    try {
        const result = await board.destroy({
            where: {
                id : board_id,
            }
        })
        return res.status(200).json({result});
    } catch (e) {
        return next(e);
    }
})


// 라우터를 작성한 후 익스포트를 밖으로 내보내줘야 app.js에서 불러들였을때 이런 설정 내용들을 읽을수 있다.
module.exports = router;