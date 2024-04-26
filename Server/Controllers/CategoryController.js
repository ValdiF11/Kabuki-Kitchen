const { Category, Cuisine, User } = require("../models");

class CategoriesController {
  static async createCategory(req, res, next) {
    try {
      const category = await Category.create(req.body);
      res.status(201).json(category);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async getAllCategory(req, res, next) {
    try {
      const category = await Category.findAll();
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async updateCategoryId(req, res, next) {
    try {
      const input = req.params.id;
      const category = await Category.findByPk(input);
      if (!category) {
        throw { name: "NotFound" };
      }
      await category.update(req.body, { where: { id: input } });
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }
  static async deleteCategoryId(req, res, next) {
    try {
      const input = req.params.id;
      const category = await Category.findByPk(input);
      if (!category) {
        throw { name: "NotFound" };
      }
      category.destroy();
      res.status(200).json({ message: `${category.name} success to delete` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoriesController;
