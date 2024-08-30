const supabase = require("../config.js");
const base64 = require("base64-arraybuffer");

exports.getImages = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from("image").select();

    if (error) {
      throw error;
    }
    if (data) {
      res.status(200).json({ amount: data.length, images: data });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getImage = async (req, res, next) => {
  const imageId = req.params.imageId;
  try {
    const { data, error } = await supabase
      .from("image")
      .select("*")
      .eq("id", imageId);

    if (error) {
      throw error;
    }
    if (data) {
      res.status(200).json({ image: data });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getImageCreators = async (req, res, next) => {
  const imageId = req.params.imageId;
  try {
    const { data, error } = await supabase
      .from("image_creator")
      .select("creator(*)")
      .eq("image", imageId);

    if (error) {
      throw error;
    }
    if (data) {
      res.status(200).json({ creators: data });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.postImage = async (req, res, next) => {
  let imageName = "";
  try {
    const name = req.body.name;
    const description = req.body.description;
    const image = req.file;

    if (!image) {
      const error = new Error("No image provided");
      error.statusCode = 422;
      throw error;
    }

    const fileBase64 = base64.decode(image.buffer.toString("base64"));

    imageName = new Date().valueOf() + image.originalname;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(imageName, fileBase64);

    if (error) {
      throw error;
    }

    const { data: newImage } = supabase.storage
      .from("images")
      .getPublicUrl(data.path);

    if (newImage) {
      const { data, error } = await supabase
        .from("image")
        .insert([
          { name: name, url: newImage.publicUrl, description: description },
        ])
        .select();

      if (error) {
        throw error;
      }
      res.status(201).json({ image: data });
    } else {
      throw error;
    }
  } catch (dataError) {
    //ta bort bild om error
    let removeError = "Image was removed. ";
    const { data, error } = await supabase.storage
      .from("images")
      .remove([imageName]);
    if (error || (!error && data.length == 0)) {
      removeError = "Deletion of image failed. ";
    }

    res.status(500).json({ error: removeError + dataError });
  }
};

exports.postImageCreators = async (req, res, next) => {
  try {
    const imageId = req.body.imageId;
    const creatorIds = req.body.creatorIds;
    const creatorIdList = [];

    creatorIds.forEach((id) => {
      let regex = /\D/;
      let bool = regex.test(id);
      if (!bool && id.length > 0) {
        creatorIdList.push({ creator: id, image: imageId });
      }
    });

    const { data, error } = await supabase
      .from("image_creator")
      .insert(creatorIdList)
      .select();

    if (error) {
      throw error;
    }
    res.status(201).json({ creator: data });
  } catch (dataError) {
    res.status(500).json({ error: dataError });
  }
};
