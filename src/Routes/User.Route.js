const express = require("express");
const router = express.Router();
const controller = require("../Controller/authController");

router.route("/signup").post(controller.UserSignup);

router.route("/signin").post(controller.UserSignIn);




module.exports = router;
