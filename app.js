const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const imageRoutes = require("./routes/image");

const app = express();

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

/**
 const express=require('express');
const app=express();
const multer  = require('multer')
const upload = multer({ dest: 'src/public/uploads/' })

    
app.post('/upload',upload.single('pic'),(req,res)=>{
    // req.file is the picture
    // req.body is text inputs
    res.status(200).send("File Uploaded");
});
 */

app.use(bodyParser.json());
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single("image"));

app.use("/image", imageRoutes);

app.listen(process.env.PORT || 4000);
 