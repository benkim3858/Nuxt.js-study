// 호출하기 전에 임의로 지정한 환경변수를 먼저 불러 온다 (진성씨 스타일)
require('./config/app.env.js');
// import jwt_util from './utils/jwt_utils.js';

const { sequelize } = require('./database/models'); // 시퀄라이즈 코드 호출

const express = require('express'); //express 모듈 불러옴
const app = express(); // http 서버 생성 (express 함수를 호출함으로써 결과를 app에 담고 http 서버를 생성)

// 제이슨 형태로 파라미터가 들어왔을때 그 내용들을 req body에다가 저장을 해줌. 그래서 req.body를 사용할 수 있게 되는 것
app.use(express.json({ limit: '300mb' })); // 서버가 한번에 요청받을수 있는 사이즈

// 접속 하는 코드
sequelize.authenticate().then(() => console.log('Connection has been established successfully.'))
.catch(err => console.error('Unable to connect to the database:', err));

// SEQUELIZE 동기화 , 테이블 생성
// { force: true }
// {alter : true}
sequelize.sync({alter : true}).then(() => console.log(" DB SYNC SUCCESS"))
.catch(err => console.log("DB SYNC FAIL:",err))

// 라우터 파일을 참조하기 위헤 
app.use('/', require('./routes'));
app.use('/user', require('./routes/user'));
app.use('/video', require('./routes/video'));

// 에러 핸들러
app.use(function (err, req, res, next){
    console.error(err);
    res.status(500).send('Something broken!');
})


// http 서버로서의 역할을 먼저 하는지 테스트 하기 위해 라우터를 먼저 작성 한다.
// 디비 연결은 그 이후에 (진성씨는 그렇게 한다.)
module.exports = {
    // 경로 설정
    path: '/api',
    handler: app,
}

