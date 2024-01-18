const express = require("express");
const router = express.Router();

// const {newPost} = require("../Controllers/postController");
const {newPost} = require("../Controllers/postsController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/compose").post(isAuthenticatedUser , newPost);

module.exports = router;