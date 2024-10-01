const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError.js");
const axios = require("axios");
const FormData = require("form-data");

const removeBG = catchAsync(async (req, res, next) => {
  const apiKey = process.env.REMOVE_BG_API_KEY; // Ensure you are using environment variables
  const apiUrl = "https://api.remove.bg/v1.0/removebg";

  const formData = new FormData();
  formData.append("image_file", req.file.buffer, req.file.originalname);
  formData.append("size", "auto");

  const response = await axios.post(apiUrl, formData, {
    headers: {
      "X-Api-Key": apiKey,
      ...formData.getHeaders(),
    },
    responseType: "arraybuffer",
  });

  const buffer = Buffer.from(response.data);
  res.setHeader("Content-Type", "image/png");
  res.send(buffer);
});

module.exports = { removeBG };
