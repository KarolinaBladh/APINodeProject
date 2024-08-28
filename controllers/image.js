const supabase = require("../config.js");
const base64 = require('base64-arraybuffer');

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
  try {
    const name = req.body.name;
    const description =  req.body.description;
    const image = req.file;

    if(!image){
      const error = new Error("No image provided");
      error.statusCode = 422;
      throw error;
    }

    const fileBase64 = base64.decode(image.buffer.toString("base64"));

    const imageName = new Date().valueOf() + image.originalname;

    const { data, error } = await supabase.storage.from('images')
    .upload(imageName, fileBase64 );

    if (error) {
      throw error;
    }

    const { data: newImage } = supabase.storage
    .from("images")
    .getPublicUrl(data.path);

    if(newImage){
      const { data, error } = await supabase.from('image')
      .insert([{ name: name, url: newImage.publicUrl, description: description },])
      .select();

      if (error) {
        //ta bort bild om error
        //await supabase.storage.from('bucket').remove(['object-key-1', 'object-key-2', ...])

        throw error;
      }
      res.status(201).json({image: data});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

/*
router.post('/fileUpload', upload.single('image'), (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        insertDocuments(db, 'public/images/uploads/' + req.file.filename, () => {
            db.close();
            res.json({'message': 'File uploaded successfully'});
        });
    });
});
*/

/**
 import { createClient } from '@supabase/supabase-js'

// Create Supabase client
const supabase = createClient('your_project_url', 'your_supabase_api_key')

// Upload file using standard upload
async function uploadFile(file) {
  const { data, error } = await supabase.storage.from('images').upload('../images', req.file.filename);
  if (error) {
    // Handle error
  } else {
    // Handle success
  }
}
 */

/*
const { data } = supabase.storage.from('bucket').getPublicUrl('filePath.jpg')
console.log(data.publicUrl)

https://[project_id].supabase.co/storage/v1/object/public/[bucket]/[asset-name]
*/

/*
fs.unlinkSync(DIR+'/'+req.params.imagename+'.png');
*/