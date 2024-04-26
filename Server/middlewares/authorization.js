const { Cuisine } = require("../models");

const authorization = async (req, res, next) => {
  try {
    let cuisine = await Cuisine.findByPk(req.params.id);
    if (!cuisine) {
      throw { name: "NotFound" };
    }
    if (req.user.role == "admin") {
      next();
    } else if (cuisine.authorId == req.user.id) {
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = authorization;
