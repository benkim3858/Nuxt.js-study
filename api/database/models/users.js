'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id : {       
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
    },
    email : {       
        type: DataTypes.STRING, 
        allowNull: false,
        comment: "이메일(아이디)"
    },
    password : {       
        type: DataTypes.STRING, 
        allowNull: false,
        comment: "비밀번호"
    },
    name : {       
        type: DataTypes.STRING, 
        allowNull: false,
        comment: "이름"
    },
    phone : {
        type: DataTypes.STRING, 
        allowNull: true,
        comment: "전화번호"
    },
    salt_key : {
        type: DataTypes.STRING, 
        allowNull: false,
        comment: "비밀번호 솔트 키"
    },
    access_token : {
        type: DataTypes.STRING, 
        allowNull: true,
        comment: "바로 전 엑세스 토큰"
    },
    refresh_token : {
        type: DataTypes.STRING, 
        allowNull: true,
        comment: "리프레쉬 토큰"
    },
  }, {
    paranoid : true
  });
  users.associate = function(models) {
    // associations can be defined here
    
    users.hasMany(models.users_token, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
    })
  };
  return users;
};