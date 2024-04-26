const express = require("express");
const CategoriesController = require("../Controllers/CategoryController");
const authentication = require("../middlewares/authenticate");
const authorization = require("../middlewares/authorization");
const router = express.Router();

router.post("/", authentication, CategoriesController.createCategory);
router.get("/", authentication, CategoriesController.getAllCategory);
router.put("/:id", authentication, authorization, CategoriesController.updateCategoryId);
router.delete("/:id", authentication, authorization, CategoriesController.deleteCategoryId);

module.exports = router;
