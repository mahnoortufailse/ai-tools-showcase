/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IconGenerator = () => {
  const [generatedIcon, setGeneratedIcon] = useState("");

  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      iconType: "",
      color: "#000000",
      size: "48",
    },
    validationSchema: Yup.object({
      iconType: Yup.string()
        .required("Icon type is required"),
      color: Yup.string().required("Color is required"),
      size: Yup.number()
        .required("Size is required")
        .positive("Size must be a positive number")
        .integer("Size must be an integer"),
    }),
    onSubmit: async (values) => {
      const data = {
        iconType: formatIconType(values.iconType),
        color: values.color,
        size: values.size,
      };

      try {
        const response = await retryRequest(data);
        setGeneratedIcon(response.data);
        toast.success("Icon generated successfully!");
      } catch (error) {
        toast.error("Failed to generate icon. Please try again later.");
      }
    },
  });

  // Ensure the iconType has the mdi: prefix
  const formatIconType = (input) => {
    return input.startsWith("mdi:") ? input.toLowerCase() : `mdi:${input.toLowerCase()}`;
  };

  // Retry logic for the request
  const retryRequest = async (data, retries = 3, delay = 1000) => {
    try {
      return await axios.post("http://localhost:9000/generate-icon", data);
    } catch (error) {
      if (retries === 0) {
        throw error;
      }
      await new Promise((res) => setTimeout(res, delay));
      return retryRequest(data, retries - 1, delay * 2);
    }
  };

  const handleDownloadIcon = () => {
    if (generatedIcon) {
      const blob = new Blob([generatedIcon], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${formik.values.iconType}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="icon-generator flex flex-col items-center justify-center py-28 px-6 bg-hero-pattern bg-cover bg-no-repeat bg-center min-h-screen">
      <ToastContainer />

      {/* Top Section - Heading and Description */}
      <div className="w-full text-center mb-8 ">
        <h1 className="text-5xl font-bold text-white mb-4">Icon Generator</h1>
        <div className="w-32 h-1 mx-auto bg-gradient-to-r from-pink-500 to-purple-400 rounded mb-6 relative z-10"></div>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Easily generate customizable icons by entering the icon type, selecting a color, and setting the size. Generate your desired icon and download it as an SVG file for use in your projects.
        </p>
      </div>

      {/* Form and Icon Preview Combined in One Container */}
      <div className="flex flex-row w-full lg:w-3/4 bg-black-100/10 backdrop-blur-lg rounded-lg shadow-lg border border-gray-600 p-8 space-x-8 max-[545px]:flex-col max-[545px]:p-3">

        {/* Form Section - Right Side */}
        <div className="w-full space-y-6">
          <form onSubmit={formik.handleSubmit}>
            <label className="block mb-3">
              <span className="text-gray-300 font-semibold">Icon Type:</span>
              <input
                type="text"
                name="iconType"
                value={formik.values.iconType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g., mdi:home"
                className="mt-2 w-full p-3 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm bg-black-100"
              />
              {formik.touched.iconType && formik.errors.iconType ? (
                <div className="text-red-500 text-sm">{formik.errors.iconType}</div>
              ) : null}
            </label>

            <label className="block mb-3">
              <span className="text-gray-300 font-semibold">Color:</span>
              <input
                type="color"
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-2 w-full h-10 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black-100"
              />
              {formik.touched.color && formik.errors.color ? (
                <div className="text-red-500 text-sm">{formik.errors.color}</div>
              ) : null}
            </label>

            <label className="block mb-4">
              <span className="text-gray-300 font-semibold">Size:</span>
              <input
                type="number"
                name="size"
                value={formik.values.size}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Icon Size"
                className="mt-2 w-full p-3 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm bg-black-100"
              />
              {formik.touched.size && formik.errors.size ? (
                <div className="text-red-500 text-sm">{formik.errors.size}</div>
              ) : null}
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-purple-900 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-900 transition-colors mt-3"
            >
              Generate Icon
            </button>
          </form>
        </div>

         {/* Icon Preview Section - Left Side */}
<div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-black-100/10 backdrop-blur-lg p-6 rounded-lg border border-gray-700 max-[545px]:p-2">
  {generatedIcon ? (
    <>
      <h2 className="text-gray-600 font-semibold text-xl mb-4">Generated Icon</h2>
      <div
        className="generated-icon w-48 h-48 flex items-center justify-center p-4 bg-black-100 rounded-lg"
        dangerouslySetInnerHTML={{ __html: generatedIcon }}
      />
      <button
        onClick={handleDownloadIcon}
        className="mt-6 py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Download Icon
      </button>
    </>
  ) : (
    <div className="text-gray-500 text-center">
      <p>No icon generated yet.</p>
      <p>Fill the form and generate your icon.</p>
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default IconGenerator;
