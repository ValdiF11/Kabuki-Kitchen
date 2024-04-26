"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cuisine.belongsTo(models.User, { foreignKey: "authorId" });
      Cuisine.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Cuisine.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Cuisine name is required",
          },
          notNull: {
            msg: "Cuisine name is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description is required",
          },
          notNull: {
            msg: "Description is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price is required",
          },
          notNull: {
            msg: "Price is required",
          },
          min: {
            args: 20000,
            msg: "Minimum price is 20000",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Image Url is required",
          },
          notNull: {
            msg: "Image Url is required",
          },
          isUrl: {
            args: "true",
            msg: "Must be URL format",
          },
        },
      },
      categoryId: {
        type: DataTypes.STRING,
        references: {
          model: "Categories",
          key: "id",
        },
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "CategoryId is required",
          },
          notNull: {
            msg: "CategoryId is required",
          },
        },
      },
      authorId: {
        type: DataTypes.STRING,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "authorId  is required",
          },
          notNull: {
            msg: "authorId is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Cuisine",
    }
  );
  return Cuisine;
};
