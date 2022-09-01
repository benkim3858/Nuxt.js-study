'use strict';
module.exports = (sequelize, DataTypes) => {
    const file = sequelize.define('file', {
        
        id : {       
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true, 
            allowNull: false
        },
        file_name : {
            type: DataTypes.STRING, 
            allowNull: false,
            comment: "파일 name"
        },
        file_url : {
            type: DataTypes.STRING, 
            allowNull: false,
            comment: "파일 url"
        },

    }, {
    });
    file.associate = function(models) {
        file.belongsTo(models.users, {foreignKey: 'users_id', onDelete: "CASCADE"})
    };
    return file;
};