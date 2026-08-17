const express = require("express");
const { getRandomQuote } = require("../controllers/quotes.controller");
const router = express.Router();

router.get("/quote", getRandomQuote);

module.exports = router;
