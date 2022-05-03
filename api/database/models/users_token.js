'use strict';
module.exports = (sequelize, DataTypes) => {
    const users_token = sequelize.define('users_token', {
        
        id : {       
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true, 
            allowNull: false
        },
        access_token : {       
            type: DataTypes.STRING, 
            allowNull: false,
            comment: "JWT ACCESS TOKEN"
        },
        refresh_token : {       
            type: DataTypes.STRING, 
            allowNull: false,
            comment: "JWT REFRESH TOKEN"
        },
        automation : {
            type: DataTypes.BOOLEAN, 
            allowNull: true,
            comment: "JWT TOKEN 자동로그인"
        },
        ip_address : {       
            type: DataTypes.STRING, 
            allowNull: false,
            comment: "발급 ip주소"
        },
    }, {
        
    });
    users_token.associate = function(models) {
        users_token.belongsTo(models.users, {foreignKey : "user_id", onDelete: "CASCADE"});
    };
    return users_token;
};