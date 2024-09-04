const express = require("express");

const comicController = require("../controllers/comic");
const router = express.Router();

// GET /comic/getComic
router.get("/getComic", comicController.getComic);

// GET /comic/getComicCreators
router.get("/getComicCreators/:comicId", comicController.getComicCreators);

// GET /comic/getComic
router.get("/getComicPages/:comicId", comicController.getComicPages);

// POST /comic/postComic
router.post("/postComic", comicController.postComic);

// POST /comic/postComicCreators
router.post("/postComicCreators", comicController.postComicCreators);

// POST /comic/postComicImages
router.post("/postComicImages", comicController.postComicImages);

module.exports = router;
