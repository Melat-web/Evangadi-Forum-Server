const express = require("express");

const router = express.Router();

const {
    postQuestions,
    allQuestions,
    singleQuestion,
} = require("../controller/questionController");

// post questions route
router.post("/ask", postQuestions);

// all questions route
router.get("/all-questions", allQuestions);

//single question route
router.get("/single-question/:questionid", singleQuestion);

module.exports = router;
