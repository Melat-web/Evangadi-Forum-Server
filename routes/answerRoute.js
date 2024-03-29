const express = require("express");

const router = express.Router();

const { postanswer, getanswer } = require("../controller/answerController");

// give/post answer
router.post("/postanswer/:questionid", postanswer);

router.get("/answers/:questionid", getanswer);

module.exports = router;
