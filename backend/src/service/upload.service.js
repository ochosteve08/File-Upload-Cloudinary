const UploadModel = require("../model/upload.model");


const fileUpload = async (name, secure_url, public_id) =>
  UploadModel.create({
    name,
    profile_img: secure_url,
    cloudinary_id: public_id,
  });

const getUserImage = async ({ id }) => UploadModel.findById(id);
const updateUserImage = async ({
  id,
  secure_url,
  public_id,
  name,
  user_name,
  profile_img,
  cloudinary_id,
}) =>
  UploadModel.findByIdAndUpdate(
    id,
    {
      name: name || user_name,
      profile_img: secure_url || profile_img,
      cloudinary_id: public_id || cloudinary_id,
    },
    { new: true }
  );
const deleteUserImage = async ({ id }) =>
  UploadModel.findOneAndDelete({ _id: id });


  module.exports = {
    getUserImage,
    updateUserImage,
    deleteUserImage,
    fileUpload
  };