const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const CuisinesController = require("../Controllers/CuisineController");
const authentication = require("../middlewares/authenticate");
const authorization = require("../middlewares/authorization");
const router = express.Router();

router.post("/", authentication, CuisinesController.createCuisine);
router.get("/", authentication, CuisinesController.getAllCuisine);
router.get("/:id", authentication, CuisinesController.getCuisinebyId);
router.put("/:id", authentication, authorization, CuisinesController.updateCuisineId);
router.delete("/:id", authentication, authorization, CuisinesController.deleteCuisineId);

router.patch("/:id/coverUrl", authentication, authorization, upload.single("avatar"), CuisinesController.updateCuisineImage);

module.exports = router;
