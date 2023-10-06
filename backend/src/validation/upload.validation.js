const Joi = require("joi");


const uploadName = Joi.object({
  name: Joi.string().min(3).required().label("name"),
 });

const uploadId = Joi.object({
  id: Joi.string().required().label("user id"),
});

const uploadImage = Joi.object({
  file: Joi.any().required().label("profile-img"),
});


module.exports = {
  uploadImage,
  uploadId,
  uploadName
};