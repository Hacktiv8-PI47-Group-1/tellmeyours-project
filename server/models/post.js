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
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: { 
          msg: "Story at least 10 characters"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: { 
          msg: "Story at least 10 characters"
        }
      }
    },
    story: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [10],
          msg: "Story at least 10 characters"
        }
      }
    },
    songs: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    trackUrl:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};