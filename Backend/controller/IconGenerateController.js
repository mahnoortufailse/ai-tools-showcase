const mongoose = require('mongoose');
const axios = require('axios');
const Icon = require('../Models/IconModel.js');
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');

// In-memory cache
const iconCache = new Map();

// Function to ensure the iconType has the mdi: prefix
const formatIconType = (input) => {
  return input.startsWith('mdi:') ? input : `mdi:${input}`;
};

const generateIcon = catchAsync(async (req, res, next) => {
  const { iconType, color, size } = req.body;
  const formattedIconType = formatIconType(iconType);

  // Check if icon is already in cache
  const cacheKey = `${formattedIconType}-${color}-${size}`;
  if (iconCache.has(cacheKey)) {
    return res.send(iconCache.get(cacheKey));
  }

  try {
    const iconResponse = await axios.get(`https://api.iconify.design/${formattedIconType}.svg`);

    if (iconResponse.status !== 200) {
      return next(new AppError("Failed to fetch icon from API", 500));
    }

    let svgIcon = iconResponse.data;

    // Remove any existing width, height, and fill attributes
    svgIcon = svgIcon.replace(/(width|height|fill)="[^"]*"/g, "");

    // Add the new fill, width, and height attributes
    svgIcon = svgIcon.replace('<svg', `<svg fill="${color}" width="${size}" height="${size}"`);

    // Cache the generated icon
    iconCache.set(cacheKey, svgIcon);

    const newIcon = new Icon({ iconType: formattedIconType, color, size, generatedIcon: svgIcon });
    await newIcon.save();

    res.send(svgIcon);
  } catch (err) {
    console.error("Error in generateIcon:", err.message);
    return next(new AppError("Failed to generate icon", 500));
  }
});

module.exports = { generateIcon };
