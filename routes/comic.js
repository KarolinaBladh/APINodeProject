const express = require("express");

const comicController = require("../controllers/comic");
const router = express.Router();

// GET /comic/getComic
router.get("/getComic", comicController.getComic);

// POST /comic/postComic
router.post("/postComic", comicController.postComic);

module.exports = router;
