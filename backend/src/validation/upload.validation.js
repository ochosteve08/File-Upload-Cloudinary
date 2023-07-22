const Joi = require("joi");


const uploadImage = joi.object({
  name: joi.string().required().label("name"),
  profile_img: joi.string().required().label("profile-img"),
  cloudinary_id: Joi.string().required().label("cloudinary id"),
});

const uploadId = joi.object({
  id: Joi.string().required().label(""),
});

const updateImage = joi.object({
  name: joi.string().required().label("name"),
  profile_img: joi.string().required().label("profile-img"),
  cloudinary_id: Joi.string().required().label("cloudinary id"),
});


module.exports = {
  uploadImageUpload,
  uploadId,
  updateImage
};