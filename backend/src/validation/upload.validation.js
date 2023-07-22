const Joi = require("joi");


const uploadName = joi.object({
  name: joi.string().min(3).required().label("name"),
 });

const uploadId = joi.object({
  id: Joi.string().required().label("user id"),
});

const uploadImage = joi.object({
   file: joi.string().required().label("profile-img"),
 });


module.exports = {
  uploadImage,
  uploadId,
  uploadName
};