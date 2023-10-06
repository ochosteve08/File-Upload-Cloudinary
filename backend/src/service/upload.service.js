const UploadModel = require("../model/upload.model");


const fileUpload = async (name, secure_urls, public_ids) =>
  UploadModel.create({
    name,
    profile_imgs: secure_urls,
    cloudinary_ids: public_ids,
  });

const getUserImage = async ({ id }) => UploadModel.findById(id);
const updateUserImage = async ({
  id,
  secure_urls,
  public_ids,
  name,
  user_name,
  profile_imgs,
  cloudinary_ids,
}) =>
  UploadModel.findByIdAndUpdate(
    id,
    {
      name: name || user_name,
      profile_imgs: secure_urls || profile_imgs,
      cloudinary_ids: public_ids || cloudinary_ids,
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