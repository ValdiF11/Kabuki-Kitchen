const { Category, Cuisine, User } = require("../models");
const { Op } = require("sequelize");
class PublicController {
  static async getAllCuisine(req, res, next) {
    try {
      const { filter, sort, search, page } = req.query;
      console.log(filter, sort, search, page, "ini query");
      let paramsQuerySQL = {};
      let limit = 10;
      let pageNumber = 1;
      let coloumnName = "createdAt";
      let ordering = "DESC";

      //  Filtering and search
      if (filter && search) {
        paramsQuerySQL.where = {
          [Op.and]: [{ name: { [Op.iLike]: `%${search}%` } }, { categoryId: filter }],
        };
      } else if (filter) {
        paramsQuerySQL.where = { categoryId: filter };
      } else if (search) {
        paramsQuerySQL.where = { name: { [Op.iLike]: `%${search}%` } };
      }

      //   Pagination
      if (page) {
        if (page.size) {
          limit = +page.size;
          paramsQuerySQL.limit = limit;
        }
        if (page.number) {
          pageNumber = +page.number;
          paramsQuerySQL.offset = limit * (pageNumber - 1);
        }
      }

      //   Sorting
      if (sort) {
        // Default colom sorting soal saat ini
        ordering = sort[0] === "-" ? "DESC" : "ASC";
        // let order = ordering === "DESC" ? sort.slice(1) : sort;
        // jika nanti dibutuhkan orderisasi berbeda
        // if (order && order != "createdAt") {
        //   coloumnName = order;
        // }
        paramsQuerySQL.order = [[coloumnName, ordering]];
      } else {
        paramsQuerySQL.order = [[coloumnName, ordering]];
      }

      console.log(paramsQuerySQL, "ini SQL");

      const { count, rows } = await Cuisine.findAndCountAll(paramsQuerySQL);
      console.log(count);
      // jika dibutuhkan menampilkan seluruh data di Front End nanti dari pada ubah ubah coding
      // if (!filter && !sort && !search && !page) {
      //   limit = count;
      // }

      res.status(200).json({
        page: pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: limit,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getCuisinebyId(req, res, next) {
    try {
      const input = req.params.id;
      const cuisine = await Cuisine.findByPk(input);
      if (!cuisine) {
        throw { name: "NotFound" };
      }
      res.status(200).json(cuisine);
    } catch (err) {
      next(err);
    }
  }
  static async getCategories(req, res, next) {
    try {
      const cuisine = await Category.findAll();
      if (!cuisine) {
        throw { name: "NotFound" };
      }
      res.status(200).json(cuisine);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PublicController;
