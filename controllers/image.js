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

  if(!req.file){
    const error = new Error("No image provided");
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const url = req.file.path;;
  const description =  req.body.description;

  try {
    const { data, error } = await supabase.from('image')
    .insert([{ name: name, url: url, description: description },])
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