module.exports = {
    // 이 다섯 가지는 .env 파일에 있기 때문에 참조 할수 있다.
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    // =========================================
    dialect: "mysql",
    dialectOptions: {
        charset: "utf8mb4",
        dateStrings: true,
        typeCast: true
    },
    define: {
        timestamp: true
    },
    timezone: "+09:00",
    pool: {
        max: 200,
        min: 0
    },
    logging: false
}