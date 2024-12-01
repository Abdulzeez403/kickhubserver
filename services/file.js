const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const mapFiles = async (files) => {
  const mappedFiles = [];

  if (Array.isArray(files) && files.length > 0) {
    for (const fls of files) {
      const { name, type, uri } = fls || {}; // Provide a fallback to prevent destructuring errors

      if (uri && typeof uri === "string") {
        // Check if uri is defined and is a string
        const publicId = name;

        if (uri.includes("res.cloudinary.com")) {
          mappedFiles.push({ name, type, uri });
        } else {
          const uploadedFile = await uploadFile(uri, publicId);
          mappedFiles.push({ name, type, uri: uploadedFile.secure_url });
        }
      } else {
        console.warn("Skipping file with missing or invalid uri:", fls);
      }
    }
  } else {
    console.warn("No files provided or files array is empty.");
  }

  return mappedFiles;
};

const uploadFile = (file, publicId) => {
  return cloudinary.uploader.upload(file, { public_id: publicId });
};

module.exports = { mapFiles, uploadFile };
