const supabase = require("../config.js");

exports.getComic = async (req, res, next) => {
  const comicId = req.params.comicId;
  try {
    const { data, error } = await supabase
      .from("comic")
      .select("*")
      .eq("id", comicId);

    if (error) {
      throw error;
    }
    if (data) {
      res.status(200).json({ comic: data });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.postComic = async (req, res, next) => {
  try {
    const name = req.body.name;
    const role = req.body.description;

    const { data, error } = await supabase
      .from("comic")
      .insert([{ name: name, description: description }])
      .select();

    if (error) {
      throw error;
    }
    res.status(201).json({ comic: data });
  } catch (dataError) {
    res.status(500).json({ error: dataError });
  }
};
