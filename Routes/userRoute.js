const express = require("express");
const { registerUser, loginUser, logoutUser, isLogin } = require("../Controllers/userController");
const { isAuthenticatedUser} = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/isLogin").post(isLogin)

module.exports = router;