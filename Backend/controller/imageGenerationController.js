const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const fetch = require("node-fetch"); // CommonJS import for node-fetch
const Gallery = require("../Models/gallerymodel.js");
const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError.js");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
// Generate Image from description and save to Cloudinary and MongoDB
const generateImage = catchAsync(async (req, res, next) => {
  const description = req.body.description;

  if (!description) {
    return next(new AppError("Description is required", 400));
  }
  try {
    // Step 1: Generate image using LimeWire API
    console.log(process.env.LIMEWIRE_API_KEY);
    const response = await fetch(
      "https://api.limewire.com/api/image/generation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LIMEWIRE_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: description,
          samples: 1, // Adjust the samples as needed
          quality: "LOW", // Adjust quality as needed
          guidance_scale: 50,
          aspect_ratio: "1:1",
          style: "PHOTOREALISTIC",
        }),
      }
    );

    if (!response.ok) {
      console.error("LimeWire API error:", await response.text());
      return next(new AppError("Image generation failed", 500));
    }

    const responseData = await response.json();
    console.log(responseData);
    const generatedImageUrl = responseData.image_url;
    if (!generatedImageUrl) {
      return next(new AppError("Image generation failed", 500));
    }

    // Step 2: Upload the image to Cloudinary from the external URL
    const cloudinaryResponse = await cloudinary.uploader.upload(
      generatedImageUrl,
      {
        folder: "uploadPic", // Optional folder in Cloudinary
        public_id: uuidv4(), // Generate a unique ID for each image
      }
    );

    const cloudinaryUrl = cloudinaryResponse.secure_url;

    // Step 3: Save the Cloudinary URL and description in MongoDB
    const newImage = new Gallery({
      imageUrl: cloudinaryUrl,
      description: description,
    });

    await newImage.save();

    res.status(201).json({
      status: "success",
      imageUrl: cloudinaryUrl,
    });
  } catch (error) {
    console.error("Error generating or uploading image:", error.message);
    next(new AppError("Image generation or upload failed", 500));
  }
});

// Get Images from MongoDB
const getImages = catchAsync(async (req, res, next) => {
  const images = await Gallery.find();
  if (!images || images.length === 0) {
    return next(new AppError("No images found", 404));
  }
  res.status(200).json({
    status: "success",
    results: images.length,
    data: images,
  });
});

module.exports = { generateImage, getImages };
