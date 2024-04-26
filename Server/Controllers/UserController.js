const { comparePassword } = require("../helper/bycript");
const { createToken } = require("../helper/jwt");
const { Category, Cuisine, User, sequelize } = require("../models");

class UsersController {
  static async addUser(req, res, next) {
    try {
      const { email, password, phoneNumber, address, username } = req.body;
      console.log(email, password, phoneNumber, address, username);
      await User.create({ email, password, phoneNumber, address, username });
      let data = await User.findOne({ where: { email }, attributes: { exclude: ["password"] } });
      res.status(201).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, username, password } = req.body;
      if ((!email && !username) || !password) {
        throw { name: "invalid input" };
      }

      let user;
      if (email) {
        user = await User.findOne({ where: { email } });
      } else if (username) {
        user = await User.findOne({ where: { username } });
      }

      if (!user) {
        throw { name: "invalid user" };
      }

      let compare = comparePassword(password, user.password);

      if (!compare) {
        throw { name: "invalid user" };
      }

      let token = createToken({ id: user.id });

      res.status(200).json({ acces_token: token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UsersController;
