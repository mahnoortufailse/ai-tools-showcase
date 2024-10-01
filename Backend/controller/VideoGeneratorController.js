const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

ffmpeg.setFfmpegPath(ffmpegPath);


const fs = require("fs");
const path = require("path");
const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError.js");

const videoGenerator = catchAsync(async (req, res) => {
  const { text, background, duration } = req.body;

  // Generate a unique file name to avoid conflicts
  const outputVideoPath = path.join(
    __dirname,
    `output-video-${Date.now()}.mp4`
  );

  // Create a video with text over a solid background using FFmpeg
  ffmpeg()
    .input(`color=c=${background}:s=1280x720`) // Use user-provided background color
    .inputFormat("lavfi")
    .outputOptions("-t", duration) // Set video duration
    .complexFilter([
      {
        filter: "drawtext",
        options: {
          fontfile: "/path/to/font.ttf", // Path to font file (optional)
          text: text, // The text to display
          fontsize: 64,
          fontcolor: "white",
          x: "(w-text_w)/2", // Center horizontally
          y: "(h-text_h)/2", // Center vertically
          alpha: 'if(lt(t,1),0,1)',
        },
      },
    ])
    .on("end", () => {
      console.log("Video created successfully");
      // Send the generated video to the client and then delete the file
      res.sendFile(outputVideoPath, () => {
        fs.unlinkSync(outputVideoPath); // Delete the file after sending it
      });
    })
    .on("error", (err) => {
      console.log("Error creating video:", err);
      res.status(500).send("Error creating video");
    })
    .save(outputVideoPath);
});

module.exports = {videoGenerator};