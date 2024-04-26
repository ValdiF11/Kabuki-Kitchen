const express = require("express");
const PublicController = require("../Controllers/PublicController");
const router = express.Router();

router.get("/cuisines", PublicController.getAllCuisine);
router.get("/cuisines/:id", PublicController.getCuisinebyId);
router.get("/categories", PublicController.getCategories);

module.exports = router;
