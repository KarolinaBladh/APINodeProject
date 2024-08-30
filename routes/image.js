const express = require("express");
const multer = require("multer");

const imageController = require("../controllers/image");

const router = express.Router();

const fileStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const maxSize = 6 * 1024 * 1024;
const fileLimits = { fileSize: maxSize };

// GET /image/getImages
router.get("/getImages", imageController.getImages);

// GET /image/getImage
router.get("/getImage/:imageId", imageController.getImage);

// GET /image/getImageCreators
router.get("/getImageCreators/:imageId", imageController.getImageCreators);

// POST /image/postImage
router.post(
  "/postImage",
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: fileLimits,
  }).single("image"),
  imageController.postImage
);

// POST /image/postImageCreators
router.post("/postImageCreators", imageController.postImageCreators);

module.exports = router;
