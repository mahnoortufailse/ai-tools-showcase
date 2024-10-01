import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const patternStyles = {
  solid: (color) => ({ backgroundColor: color }),
  gradient: (color) => ({
    backgroundImage: `linear-gradient(135deg, ${color}, #f0f0f0)`,
  }),
  stripes: (color) => ({
    background: `repeating-linear-gradient(45deg, ${color}, ${color} 10px, #fff 10px, #fff 20px)`,
  }),
  polkaDots: (color) => ({
    background: `radial-gradient(${color} 10%, transparent 10%)`,
    backgroundSize: "20px 20px",
  }),
  none: () => ({ backgroundColor: "transparent" }), // Added none option
};

const BackgroundGeneratePage = () => {
  const { imageUrl } = useParams();
  const [bgColor, setBgColor] = useState("#ffffff");
  const [pattern, setPattern] = useState("none"); // Default to none
  const canvasRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      imageUrl: decodeURIComponent(imageUrl),
    },
    validationSchema: Yup.object({
      imageUrl: Yup.string().required("Image URL is required"),
    }),
    onSubmit: () => {
      generateDownloadableImage();
    },
  });

  const generateDownloadableImage = () => {
    if (canvasRef.current && formik.values.imageUrl) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
  
      const img = new Image();
      img.src = formik.values.imageUrl;
      img.crossOrigin = "Anonymous"; // This is needed for cross-origin images.
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
  
        // Set the background based on the selected pattern
        if (pattern === "solid") {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (pattern === "gradient") {
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, bgColor);
          gradient.addColorStop(1, "#f0f0f0"); // You can customize the second color here
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (pattern === "stripes") {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#ffffff";
          for (let i = 0; i < canvas.width; i += 20) {
            ctx.fillRect(i, 0, 10, canvas.height);
          }
        } else if (pattern === "polkaDots") {
          // Draw background color first
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Set the dot properties
          const dotRadius = 5; // Radius of each dot
          const spacing = 40; // Distance between the dots
          ctx.fillStyle = "#ffffff"; // Color of the dots
  
          // Draw polka dots across the entire canvas
          for (let y = 0; y < canvas.height; y += spacing) {
            for (let x = 0; x < canvas.width; x += spacing) {
              ctx.beginPath();
              ctx.arc(x, y, dotRadius, 0, Math.PI * 2, true); // Draw each dot
              ctx.fill();
            }
          }
        }
  
        // After drawing the background, draw the image on top
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
        // Create downloadable link
        const link = document.createElement("a");
        link.download = "custom_background.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
  
        toast.success("Image downloaded successfully!");
      };
  
      img.onerror = () => {
        toast.error("Failed to load the image. Please check the URL.");
      };
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-hero-pattern bg-cover bg-no-repeat bg-center p-4 md:p-8 pt-20 max-[640px]:pt-24 align-middle max-[640px]:flex-row">
      <ToastContainer />
      <div className="bg-black-100/40 backdrop-blur-md rounded-xl p-7 md:p-10 max-w-5xl w-full flex flex-col-reverse md:flex-row md:gap-x-12 mt-28 max-[640px]:mt-3">
        {/* Form Section */}
        <div className="flex-1 flex flex-col mb-8 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-3">
            Customize Your Background
          </h1>
          <div className="mb-2 w-16 md:w-20 h-1 border-4 border-purple-950"></div>

          {/* Background color picker */}
          <div className="mb-6">
            <label className="block text-gray-300 text-lg font-medium mb-2">
              Select Background Color:
            </label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-12 h-12 border border-gray-300 rounded-lg transition-shadow duration-300 ease-in-out hover:shadow-xl"
            />
          </div>

          {/* Pattern picker */}
          <div className="mb-8">
            <label className="block text-gray-300 text-lg font-medium mb-2">
              Select Pattern:
            </label>
            <select
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300 ease-in-out bg-black-100 pr-3"
            >
              <option value="none">None</option> {/* Added None option */}
              <option value="solid">Solid</option>
              <option value="gradient">Gradient</option>
              <option value="stripes">Stripes</option>
              <option value="polkaDots">Polka Dots</option>
            </select>
          </div>

          {/* Image URL Input with Error Handling */}
          <div className="mb-6">
            <label className="block text-gray-300 text-lg font-medium mb-2">
              Image URL:
            </label>
            <input
              type="text"
              name="imageUrl"
              value={formik.values.imageUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 border rounded-lg transition-colors duration-300 ease-in-out ${
                formik.touched.imageUrl && formik.errors.imageUrl
                  ? "border-red-500"
                  : "border-gray-500"
              }`}
            />
            {formik.touched.imageUrl && formik.errors.imageUrl ? (
              <div className="text-red-500 text-sm">
                {formik.errors.imageUrl}
              </div>
            ) : null}
          </div>

          {/* Download Button */}
          <div className="text-start mt-8">
            <button
              onClick={formik.handleSubmit}
              className="bg-purple-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-md hover:bg-purple-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 w-full md:w-1/2"
            >
              Download
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex items-center justify-center">
          <canvas ref={canvasRef} className="hidden" />
          <div
            className="rounded-lg overflow-hidden border-2 border-gray-500 border-dashed flex justify-center p-2 w-full h-full max-w-full md:max-w-md lg:max-w-md mb-4"
            style={{
              ...patternStyles[pattern](bgColor),
              display: "inline-block",
              borderRadius: "12px",
              backgroundSize: "cover",
              padding: "3px",
            }}
          >
            {formik.values.imageUrl && (
              <img
                src={formik.values.imageUrl}
                alt="Processed"
                className="rounded-md w-full h-full object-contain" // Changed to object-contain
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundGeneratePage;
