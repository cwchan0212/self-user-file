const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/** App Routes **/

router.get("/", userController.homepage);
router.post("/user/:id", userController.modified);
router.post("/created", userController.created);
module.exports = router;
