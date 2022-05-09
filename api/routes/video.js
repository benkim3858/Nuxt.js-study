const { Router } = require('express');
const router = Router();
const { Op } = require("sequelize");
const {users} = require('../database/models/users');
const signedUrl = require('../utils/signed-url');

// 서버에서 aws 클라우드 프론트에 있는 강의 동영상으로 가는 길을 알려주는 것이다.
// 그 길을 암호화 해서 알려주는게 signedUrl이다. 
router.get('/streaming/:class_name/:class_no', function(req, res){
    const {class_name, class_no} = req.params;

    const url = `https://d155rgiwvxmktz.cloudfront.net/${class_name}/${class_no}`;
    const data = signedUrl.create(url);

    return res.redirect(301, data);
});

module.exports = router;