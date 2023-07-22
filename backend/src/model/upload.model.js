const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profile_img: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});
const UploadModel = mongoose.model("upload", userSchema);
module.exports = UploadModel;
