const express = require("express");
const UsersController = require("../Controllers/UserController");
const adminAuth = require("../middlewares/adminAuthorization");
const authentication = require("../middlewares/authenticate");
const errorHandler = require("../middlewares/errorHandler");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Home");
});

router.post("/add-user", authentication, adminAuth, UsersController.addUser);
router.post("/login", UsersController.login);
router.use("/pub", require("./pub"));
router.use("/cuisines", require("./cuisine"));
router.use("/categories", require("./category"));

module.exports = router;
