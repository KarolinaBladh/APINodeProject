const express = require("express");

const creatorController = require("../controllers/creator");
const router = express.Router();

// GET /creator/getCreators
router.get("/getCreators", creatorController.getCreators);

// GET /creator/getCreatorImages
router.get("/getCreatorImages/:creatorId", creatorController.getCreatorImages);

// POST /creator/postCreator
router.post("/postCreator", creatorController.postCreator);

module.exports = router;
