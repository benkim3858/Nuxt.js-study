const fs = require('fs'); // 파일시스템 모듈 (파일 읽기,쓰기)
const path = require('path'); // path 유틸리티 (파일 경로 유틸리티, 어떤 경로를 적었을때 경로를 만들어줌)
const Sequelize = require('sequelize'); // 시퀄라이저 모듈 호출
const basename = path.basename(__filename); // 현재 이 파일 
const config = require(path.join(process.env.configPath, './db.config.js')); // app.env.js config 불러옴 (진성씨 마음대로 함)
const db = {}; 

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config); // config 기반으로 새로운 시퀄라이즈 객체 생성
// ===여기 까지는 디비에 연결만 한 상태
// 밑에서 부터 테이블 연결

// 디렉토리의 모델 코드를 전부 스캔해서 객체로 만드는 과정 
fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize; // 소문자는 디비 커넥션 들이 들어가 있다.
db.Sequelize = Sequelize; // 대문자는 시퀄라이즈의 모듈내용이 들어가있다.

// 항상 마지막에는 익스포트 해줌. 해줘야 쓸수 있다.
module.exports = db;