const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profile_imgs: [
    {
      type: String,
    },
  ],
  cloudinary_ids: [
    {
      type: String,
    },
  ],
});
const UploadModel = mongoose.model("upload", userSchema);
module.exports = UploadModel;
