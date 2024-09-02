const express = require("express");
const bodyParser = require("body-parser");

const imageRoutes = require("./routes/image");
const creatorRoutes = require("./routes/creator");
const comicRoutes = require("./routes/comic");

const app = express();

app.use(bodyParser.json());

app.use("/image", imageRoutes);
app.use("/creator", creatorRoutes);
app.use("/comic", comicRoutes);

app.listen(process.env.PORT || 4000);
