'use strict';
module.exports = (sequelize, DataTypes) => {
  const board = sequelize.define('board', {
    id : {       
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false
    },
    // title : {       
    //     type: DataTypes.STRING, 
    //     allowNull: false,
    //     comment: "제목"
    // },
    // thumbnail_url : {
    //     type: DataTypes.STRING, 
    //     allowNull: true,
    //     comment: "썸네일 주소"
    // },
    content : {
        type: DataTypes.TEXT, 
        allowNull: false,
        comment: "내용"
    },
    // views : {
    //     type: DataTypes.INTEGER, 
    //     allowNull: false,
    //     comment: "조회수",
    //     defaultValue : 0
    // },
    
  }, {
      
  });
    board.associate = function(models) {
    board.belongsTo(models.users, {foreignKey: 'user_id',sourceKey: "id"});
    // board.belongsTo(models.category, {foreignKey: 'category_id',sourceKey: "id"});

    // board.hasMany(models.board_file, {foreignKey: 'board_id', sourceKey: 'id', onDelete: 'cascade', hooks:true});

    
  };
  return board;
};