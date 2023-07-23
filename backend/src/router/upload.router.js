const { uploadController } = require("../controller");
const { Router } = require("express");
const { cloudinary } = require("../utils");

const router = Router();

router.post(
  "/",
  cloudinary.upload.single("image"),
  uploadController.uploadImage
);
router.get("/:id", uploadController.fetchImage);
router.put(
  "/:id",
  cloudinary.upload.single("image"),
  uploadController.updateImage
);
router.delete("/:id", uploadController.deleteImage);

module.exports = router;
