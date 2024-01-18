const express = require("express");
const router = express.Router();

// const {newPost} = require("../Controllers/postController");
const {newPost, checkName} = require("../Controllers/postsController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/compose").post(isAuthenticatedUser , newPost);
router.route("/checkName").post(checkName);

module.exports = router;