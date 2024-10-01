const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError.js");
const Mockup = require("../Models/NewsModel.js");

const getNews = catchAsync(async (req, res, next) => {
  const mockups = await Mockup.find();
  console.log("Fetched Mockups:", mockups); // Log the mockups

  if (!mockups || mockups.length === 0) {a
    return next(new AppError("No mockups found", 404));
  }
  res.json(mockups);
});


const generateNews = catchAsync(async (req, res, next) => {
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);

  const { headline, content } = req.body;

  if (!headline || !content || !req.file) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const mockup = new Mockup({
    headline,
    content,
    image: req.file ? `/uploads/${req.file.filename}` : "", // Correct path
  });

  await mockup.save();
  res.status(201).json(mockup);
});

module.exports = { getNews, generateNews };
