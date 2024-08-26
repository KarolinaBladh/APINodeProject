const express = require("express");
const bodyParser = require("body-parser");

const imageRoutes = require("./routes/image");

const app = express();

app.use(bodyParser.json());

app.use("/image", imageRoutes);

app.listen(process.env.PORT || 4000);
 