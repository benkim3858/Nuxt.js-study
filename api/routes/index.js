const { Router } = require('express');
const router = Router();

import jwt_utils from '../utils/jwt_utils'

router.get('/', async function(req, res){
    return res.status(200).send("Hello Ben! This is GET");
});

router.post('/refresh_token', jwt_utils.refresh_token);

module.exports = router;