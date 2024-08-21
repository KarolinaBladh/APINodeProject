 const express = require("express");

const imageController = require("../controllers/image");

const router = express.Router();

// GET /image/images
router.get("/getImages", imageController.getImages);

// GET /image/image
router.get("/getImage/:imageId", imageController.getImage);

// POST /image
router.post("/postImage", imageController.postImage);

module.exports = router;
