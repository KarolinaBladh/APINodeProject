 const express = require("express");

const imageController = require("../controllers/image");

const router = express.Router();

// POST /feed/post
//router.post("/post", feedController.createPost);

// GET /image/images
router.get("/images", imageController.getImages);

// GET /image/image
router.get("/image", imageController.getImage);

module.exports = router;
