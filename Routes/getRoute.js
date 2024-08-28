const express = require("express");
const router = express.Router();

const {Journal, userJournal, getSingleBlog, getAllBlogs, searchBlog} = require("../Controllers/JournalController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/Journal").get(Journal);
router.route("/userJournal").post(isAuthenticatedUser, userJournal);
router.get('/blogs/:blogId', getSingleBlog);
router.route("/blogs").get(getAllBlogs)
router.route("/search").get(searchBlog);


module.exports = router;

