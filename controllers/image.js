const supabase = require("../config.js");

/*exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  //create post in db
  res.status(201).json({
    message: "Post created;",
    posts: [{ id: new Date().toISOString(), title: title, content: content }],
  });
};*/

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
  const imageId = req.body.id;
  try {
    const { data, error } = await supabase.from("image").select("*").eq('id', 2) ;

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
