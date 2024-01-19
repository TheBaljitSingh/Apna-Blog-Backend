const express = require("express");
const router = express.Router();

// const {newPost} = require("../Controllers/postController");
const {newPost, checkName, deletePost} = require("../Controllers/postsController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/compose").post(isAuthenticatedUser , newPost);
router.route("/checkName").post(checkName);
router.route("/deletePost").delete(deletePost);

module.exports = router;