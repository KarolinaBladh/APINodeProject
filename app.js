const express = require("express");

const feedRoutes = require("./routes/feed");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'none'");
  next();
});

app.use("/feed", feedRoutes);

app.listen(8080);
