const UploadModel = require('../model')
const {success,error} = require('../lib-handler')
const {uploadService} = require('../service')
const {
    bufferToDataURI,
    cloudinary
} = require('../utils');
const {uploadValidation} = require('../validation')


const uploadImage = async(req,res,next)=>{
   
    try{
         const { file } = await uploadValidation.uploadImage.validateAsync(req);
         const { name } = await uploadValidation.uploadName.validateAsync(req.body);

         const fileFormat = file.mimetype.split("/")[1];
         const { base64 } = bufferToDataURI(fileFormat, file.buffer);
         const imageDetails = await cloudinary.uploadToCloudinary(
           base64,
           fileFormat
         );
         if (!imageDetails) {
           throw error.throwPreconditionFailed({
             message: "Server Issue! failed to upload",
           });
         }
         const { secure_url, public_id } = imageDetails;
         const data = await uploadService.fileUpload(
           name,
           secure_url,
           public_id
         );
        
         return success.handler({ data }, req, res, next);
    }
    catch(error){
        return error.handler(error, req, res, next);
    }
}
const fetchImage = async (req, res,next) => {
  
  try{
    const { id } = await uploadValidation.uploadId.validateAsync(req.params); ;
    const data = await uploadService.getUserImage(id);
     if (!data) {
       throw error.throwNotFound({ message: "image not found" });
     }
     return success.handler({ data }, req, res, next);
  }
  catch(error){
      return error.handler(error, req, res, next);
  }
};


const updateImage = async (req, res, next) => {
  try {
    const { id } = await uploadValidation.uploadId.validateAsync(req.params);
    const { file } = await uploadValidation.uploadImage.validateAsync(req);
    const { name } = await uploadValidation.uploadName.validateAsync(req.body);
   

    // Find the user's current image details in MongoDB
    const user = await UploadModel.findById(id);
   
     if (!user) {
       throw error.throwNotFound({ message: "user not found" });
     }
    const user_name = user.name;
    const { profile_img, cloudinary_id } = user;

    // Delete the user's current image from Cloudinary
   const imageDelete = await cloudinary.deleteImageFromCloudinary(cloudinary_id);

    if (!imageDelete) {
      throw error.throwPreconditionFailed({
        message: "Server Issue! failed to delete image",
      });
    }
    // Upload the new image to Cloudinary
    const fileFormat = file.mimetype.split("/")[1];
    const { base64 } = bufferToDataURI(fileFormat, file.buffer);
    const imageDetails = await cloudinary.uploadToCloudinary(base64, fileFormat);

    if (!imageDetails) {
      throw error.throwPreconditionFailed({
        message: "Server Issue! failed to upload",
      });
    }
    const { secure_url, public_id } = imageDetails;

    const data = await uploadService.updateUserImage({
      id,
      secure_url,
      public_id,
      name,
      user_name,
      profile_img,
      cloudinary_id,
    });
     return success.handler(
       { message: "Image updated successfully", data },
       req,
       res,
       next
     );
     } catch (error) {
    return error.handler(error, req, res, next);
  }
};


const deleteImage = async (req, res, next) => {
  try {
    const { id } = await uploadValidation.uploadId.validateAsync(req.params);

    // Find the user's current image details in MongoDB
    const user = await UploadModel.findById(id);
    if (!user) {
      throw error.throwNotFound({ message: "user not found" });
    }
    const user_name = user.name;
    const { profile_img, cloudinary_id } = user;

    // Delete the user's current image from Cloudinary
    const imageDelete = await cloudinary.deleteImageFromCloudinary(
      cloudinary_id
    );

    if (!imageDelete) {
      throw error.throwPreconditionFailed({
        message: "Server Issue! failed to delete image",
      });
    }

    const User = await uploadService.deleteUserImage({ id });
    
    return success.handler(
      { message: "Image deleted successfully", data },
      req,
      res,
      next
    );
  } catch (error) {
    return error.handler(error, req, res, next);
  }
};






module.exports = {
  uploadImage,
  fetchImage,
  updateImage,
  deleteImage,
};