const { Category, Cuisine, User } = require("../models");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
class CuisinesController {
  static async createCuisine(req, res, next) {
    try {
      let { id, name, description, price, imgUrl, categoryId } = req.body;
      const cuisine = await Cuisine.create({ id, name, description, price, imgUrl, categoryId, authorId: req.user.id });
      res.status(201).json(cuisine);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async getAllCuisine(req, res, next) {
    try {
      const cuisine = await Cuisine.findAll({
        include: {
          model: User,
          attributes: { exclude: ["password"] },
        },
      });
      res.status(200).json(cuisine);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async getCuisinebyId(req, res, next) {
    try {
      const input = req.params.id;
      const cuisine = await Cuisine.findByPk(input, {
        include: {
          model: User,
          attributes: { exclude: ["password"] },
        },
      });
      if (!cuisine) {
        throw { name: "NotFound" };
      }
      res.status(200).json(cuisine);
    } catch (err) {
      next(err);
    }
  }

  static async updateCuisineId(req, res, next) {
    try {
      const input = req.params.id;
      let { id, name, description, price, imgUrl, categoryId } = req.body;
      const cuisine = await Cuisine.findByPk(input);
      if (!cuisine) {
        throw { name: "NotFound" };
      }
      await cuisine.update({ id, name, description, price, imgUrl, categoryId });
      res.status(200).json(cuisine);
    } catch (err) {
      next(err);
    }
  }

  static async deleteCuisineId(req, res, next) {
    try {
      const input = req.params.id;
      const cuisine = await Cuisine.findByPk(input);
      if (!cuisine) {
        throw { name: "NotFound" };
      }
      cuisine.destroy();
      res.status(200).json({ message: `${cuisine.name} success to delete` });
    } catch (err) {
      next(err);
    }
  }

  static async updateCuisineImage(req, res, next) {
    try {
      const cuisine = await Cuisine.findByPk(req.params.id);
      if (!cuisine) {
        throw { name: "NotFound" };
      }
      if (!req.file) {
        throw { name: "FileRequired" };
      }
      const base64String = req.file.buffer.toString("base64");
      const dataUrl = `data:${req.file.mimetype};base64,${base64String}`;
      const result = await cloudinary.uploader.upload(dataUrl, {
        public_id: req.file.originalname,
        folder: "Kabuki-Kitchen",
      });
      await cuisine.update({ imgUrl: result.secure_url });
      res.json({ message: `Image ${cuisine.name} succes to update` });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = CuisinesController;
