const express = require("express");
const router = express.Router();

const {Journal, userJournal} = require("../Controllers/JournalController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/Journal").get(Journal);
router.route("/userJournal").post(isAuthenticatedUser, userJournal);



module.exports = router;

