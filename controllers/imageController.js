require('dotenv').config();
const formidable = require('formidable');
const { Image } = require('../models/models');
const ApiError = require('../error/ApiError');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY__NAME,
  api_key: process.env.CLOUDINARY__KEY,
  api_secret: process.env.CLOUDINARY__SECRET
});

class ImageController {
  async upload(req, res, next) {
    const { color } = req.query;
    const form = formidable({ multiples: true });
    try {
      const result = new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            reject(err);
          } else {
            resolve({ fields, files });
          }
        });
      });

      const { fields, files } = await result;
      
      const imagePromises = [];

      if (Array.isArray(files.file)) {
        for (let i = 0; i < files.file.length; i++) {
          const file = files.file[i];
          const data = await cloudinary.uploader.upload(file.filepath, {
            public_id: file.name,
          });
          imagePromises.push(data);
        }
      } else {
        const file = files.file;
        const data = await cloudinary.uploader.upload(file.filepath, {
          public_id: file.name,
        });
        imagePromises.push(data);
      }

      const uploadedImages = await Promise.all(imagePromises);

      const createdImages = [];

      for (let i = 0; i < uploadedImages.length; i++) {
        const data = uploadedImages[i];

        const img = await Image.create({
          nameFile: data.original_filename,
          url: data.secure_url,
        });

        createdImages.push(img);
      }

      return res.json({
        data: createdImages.map((img) => ({
          id: img.id,
          name: img.nameFile,
          url: img.url,
        }))
      });
    } catch (err) {
      return next(ApiError.badRequest(err.message || 'Не удалось загрузить изображения'));
    }
  }

  async imageUploadId(req, res) {
    // получения изображения по ID
  }
}

module.exports = new ImageController();
