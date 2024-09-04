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

exports.getComicCreators = async (req, res, next) => {
  const comicId = req.params.comicId;
  try {
    const { data, error } = await supabase
      .from("comic_creator")
      .select("creator(*)")
      .eq("comic", comicId);

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

exports.getComicPages = async (req, res, next) => {
  const comicId = req.params.comicId;
  try {
    const { data, error } = await supabase
      .from("comic_image")
      .select("image(*)")
      .eq("comic", comicId)
      .order("page", { ascending: true });

    if (error) {
      throw error;
    }
    if (data) {
      res.status(200).json({ pages: data });
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

exports.postComicCreators = async (req, res, next) => {
  try {
    const comicId = req.body.comicId;
    const creators = req.body.creators;
    const creatorList = [];

    creators.forEach((creator) => {
      let regex = /\D/;
      let idBool = regex.test(creator.id);
      let roleBool = regex.test(creator.role);
      if (
        !idBool &&
        creator.id.length > 0 &&
        !roleBool &&
        creator.role.length > 0
      ) {
        creatorList.push({
          creator: creator.id,
          comic: comicId,
          role: creator.role,
        });
      }
    });

    const { data, error } = await supabase
      .from("comic_creator")
      .insert(creatorList)
      .select();

    if (error) {
      throw error;
    }
    res.status(201).json({ creator: data });
  } catch (dataError) {
    res.status(500).json({ error: dataError });
  }
};

exports.postComicImages = async (req, res, next) => {
  try {
    const comicId = req.body.comicId;
    const images = req.body.images;
    const imageList = [];

    images.forEach((image) => {
      let regex = /\D/;
      let idBool = regex.test(image.id);
      let pageBool = regex.test(image.page);
      if (
        !idBool &&
        image.id.length > 0 &&
        !pageBool &&
        image.page.length > 0
      ) {
        imageList.push({ image: image.id, comic: comicId, page: image.page });
      }
    });

    const { data, error } = await supabase
      .from("comic_image")
      .insert(imageList)
      .select();

    if (error) {
      throw error;
    }
    res.status(201).json({ images: data });
  } catch (dataError) {
    res.status(500).json({ error: dataError });
  }
};
