const { Router } = require('express');
const router = Router();
// 모델 불러오기
const {users} = require('../database/models');


router.post('/sign_up', async function(req, res, next){ // 콜백에 req, res, next
    // 구조 분해 할당
    const {email, password, name, phone} = req.body;
    try {
        await users.create({
            email,
            password,
            name,
            phone,
        })
        // end는 요청을 끝내겠다. (클라이언트에게 리턴값을 주겠다.)
        return res.status(200).end();
    } catch (e) {
        return next(e)
    }
});

router.post('/sign_in', async function(req, res, next){
    const {email, password} = req.body;
    try {
        const result = await users.findOne({
            where: {
                email,
                password,
            }
        })
        if(result) {
            return res.status(200).json({ result: true});
        } else {
            throw new Error('Not Found User');
        }
    } catch (e) {
        return next(e);
    }
})

// 라우터를 작성한 후 익스포트를 밖으로 내보내줘야 app.js에서 불러들였을때 이런 설정 내용들을 읽을수 있다.
module.exports = router;