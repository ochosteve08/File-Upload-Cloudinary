const cloudinary = require("cloudinary");
const multer = require("multer");


// const checkFileType = function (file, cb) {
//   const fileTypes = /jpeg|jpg|png|gif|svg|ico/;

//   const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimeType = fileTypes.test(file.mimeType);

//   if (mimeType && extName) {
//     return cb(null, true);
//   } else {
//     cb("Error: you can only upload images!!!");
//   }
// };

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (fileString, format) => {
  try {
    const { uploader } = cloudinary;
    const res = await uploader.upload(
      `data:image/${format};base64,${fileString}`
    );

    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteImageFromCloudinary = async (cloudinaryId) => {
  try {
    const { uploader } = cloudinary;
    const result = await uploader.destroy(cloudinaryId);
    // If the result contains the "result" field and its value is "ok", the image was successfully deleted
    if (result && result.result === "ok") {
      console.log("Image deleted successfully from Cloudinary");
    } else {
      throw new Error("Failed to delete image from Cloudinary");
    }
  } catch (error) {
    throw new Error(error.message || "Error deleting image from Cloudinary");
  }
};





// const storageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}--${file.originalname}`);
//   },
// });

// initializing multer
// const upload = multer({
//   storage: storageEngine,
//   limits: { fileSize: 1000000 },
//   fileFilter: (req, file, cb) => {
//     checkFileType(file, cb);
//   },
// });


module.exports = {
  upload,
  uploadToCloudinary,
  deleteImageFromCloudinary,
};







