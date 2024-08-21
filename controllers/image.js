const supabase = require("../config.js");

exports.getImages = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from("image").select();

    if (error) {
      throw error;
    }
    if (data) {
      res.status(200).json({amount: data.length, images: data});
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getImage = async (req, res, next) => {
  const imageId = req.params.imageId;
  try {
    const { data, error } = await supabase.from("image").select("*").eq('id', imageId);

    if (error) {
      throw error;
    }
    if (data) {
      res.status(200).json({image: data});
    }
  } catch (error) {
    console.log(error);
  }
};

exports.postImage = async (req, res, next) => {
  //const title = req.body.title;
  //const content = req.body.content;

  try {
    const { data, error } = await supabase.from('image')
    .insert([{ name: 'someValue', url: 'otherValue', description: 'otherValue' },])
    .select();

    if (error) {
      throw error;
    }
    if (data) {
      res.status(201).json({image: data});
    }
  } catch (error) {
    console.log(error);
  }
};