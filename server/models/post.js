'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey:'UserId'})
    }
  };
  Post.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    story: DataTypes.STRING,
    songs: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    trackUrl:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};