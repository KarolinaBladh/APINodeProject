 const express = require("express");
 const multer = require("multer");

const imageController = require("../controllers/image");

const router = express.Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter =  (req, file, cb) => {
    if( file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const maxSize = 6 * 1024 * 1024;
const fileLimits = { fileSize: maxSize}

// GET /image/images
router.get("/getImages", imageController.getImages);

// GET /image/image
router.get("/getImage/:imageId", imageController.getImage);

// POST /image
router.post("/postImage", multer({storage: fileStorage, fileFilter: fileFilter, limits: fileLimits}).single("image"), imageController.postImage);

module.exports = router;
