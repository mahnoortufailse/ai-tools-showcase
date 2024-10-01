import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { StarsCanvas } from "./canvas";

const CreateMockupNewForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      headline: "",
      content: "",
      image: null,
    },
    onSubmit: async (values) => {
      if (!values.headline || !values.content || !values.image) {
        toast.error("Please fill all fields before submitting.");
        return;
      }

      const formData = new FormData();
      formData.append("headline", values.headline);
      formData.append("content", values.content);
      formData.append("image", values.image);

      // Debugging: log formData
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`); // This will show if 'image' is included
      }

      try {
        setIsLoading(true); // Set loading state
        const response = await axios.post("http://localhost:9000/mockupNews", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Response:", response);
        toast.success("Mockup created successfully!");
        navigate("/mockupPreview", {
          state: {
            headline: values.headline,
            content: values.content,
            image: URL.createObjectURL(values.image),
          },
        });
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error('Error response:', error.response.data);
          // toast.error("Error: " + error.response.data.message || "An error occurred.");
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error request:', error.request);
          // toast.error("No response from server.");
        } else {
          // Something happened in setting up the request
          console.error('Error message:', error.message);
          toast.error("Error: " + error.message);
        }
      } finally {
        setIsLoading(false); // Reset loading state
      }
    },
  });

  return (
    <div className="bg-primary py-20 md:py-44 min-h-screen">
      <header className="text-center mb-10 p-3">
        <h1 className="text-4xl font-extrabold tracking-tight leading-tight text-white max-[600px]:text-3xl mb-3">
          Create Your Mockup
        </h1>
        <div className="w-32 h-1 mx-auto bg-gradient-to-r from-pink-500 to-purple-400 rounded mb-6 relative z-10"></div>
        <p className="text-lg mt-2 text-gray-300 max-[600px]:text-base">
          Fill in the details below to create a new mockup.
        </p>
      </header>

      <div className="flex flex-col md:flex-row justify-center gap-10 max-w-2xl mx-auto p-8 bg-black-100 bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg border border-gray-700  ">
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="mb-5">
            <label htmlFor="headline" className="block text-gray-400 mb-2">
              Headline
            </label>
            <input
              id="headline"
              type="text"
              placeholder="Enter your headline"
              name="headline"
              value={formik.values.headline}
              onChange={formik.handleChange}
              required
              className="w-full p-4 border border-gray-800 rounded-md focus:outline-none focus:ring-2 bg-gray-900 text-white transition duration-150 ease-in-out"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="content" className="block text-gray-400 mb-2">
              News Content
            </label>
            <textarea
              id="content"
              placeholder="Enter the news content"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              required
              className="w-full p-4 border border-gray-800 rounded-md focus:outline-none bg-gray-900 text-white transition duration-150 ease-in-out"
              rows="5"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="image" className="block text-gray-400 mb-2">
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              name="image"
              onChange={(e) => {
                if (e.currentTarget.files && e.currentTarget.files[0]) {
                  console.log("Selected file:", e.currentTarget.files[0]); // Log the selected file
                  formik.setFieldValue("image", e.currentTarget.files[0]);
                }
              }}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading} // Disable button while loading
            className={`w-full py-3 ${isLoading ? 'bg-gray-500' : 'bg-blue-600'} text-white rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {isLoading ? "Creating..." : "Create Mockup"}
          </button>
        </form>
        <StarsCanvas />
      </div>
    </div>
  );
};

export default CreateMockupNewForm;
