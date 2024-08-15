const express = require("express");
const supabase = require("./config.js");
const bodyParser = require("body-parser");

const feedRoutes = require("./routes/feed");

const app = express();

app.use(bodyParser.json());

app.get("/images", async (req, res) => {
  try {
    const { data, error } = await supabase.from("image").select();

    if (error) {
      throw error;
    }
    if (data) {
      res.status(200).send(data);
    }
  } catch (error) {
    console.log(error);
  }
});

app.use("/feed", feedRoutes);

app.listen(process.env.PORT || 4000);
