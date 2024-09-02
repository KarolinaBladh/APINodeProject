const supabase = require("../config.js");

exports.getCreators = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from("creator").select();

    if (error) {
      throw error;
    }
    if (data) {
      res.status(200).json({ amount: data.length, creators: data });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getCreatorImages = async (req, res, next) => {
  const creatorId = req.params.creatorId;
  try {
    const { data, error } = await supabase
      .from("image_creator")
      .select("image(*)")
      .eq("creator", creatorId);

    if (error) {
      throw error;
    }
    if (data) {
      res.status(200).json({ images: data });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.postCreator = async (req, res, next) => {
  try {
    const name = req.body.name;
    const role = req.body.role;

    const { data, error } = await supabase
      .from("creator")
      .insert([{ name: name, role: role }])
      .select();

    if (error) {
      throw error;
    }
    res.status(201).json({ creator: data });
  } catch (dataError) {
    res.status(500).json({ error: dataError });
  }
};
