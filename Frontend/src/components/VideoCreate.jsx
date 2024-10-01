import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { gsap } from "gsap";
import "react-toastify/dist/ReactToastify.css";

const VideoCreate = () => {
  const formRef = useRef(null);

  // Enhanced GSAP animation on mount
  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }
    );
  }, []);

  const formik = useFormik({
    initialValues: {
      text: "",
      background: "#3498db",
      duration: 5,
    },
    validationSchema: Yup.object({
      text: Yup.string().required("Text is required."),
      background: Yup.string().required("Background color is required."),
      duration: Yup.number()
        .required("Duration is required.")
        .min(1, "Duration must be at least 1 second."),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(
          "http://localhost:9000/generate-video",
          { text: values.text, background: values.background, duration: values.duration },
          { responseType: "blob" }
        );

        const videoBlob = new Blob([response.data], { type: "video/mp4" });
        const videoURL = window.URL.createObjectURL(videoBlob);
        const link = document.createElement("a");
        link.href = videoURL;
        link.download = "output-video.mp4";
        link.click();

        toast.success("Video generated successfully!");
      } catch (error) {
        console.error("Error generating video:", error);
        toast.error("Failed to generate video. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-hero-pattern bg-cover bg-no-repeat bg-center py-40 px-4 max-[640px]:py-20">
        <div className="text-center md:text-left md:max-w-lg lg:max-w-xl mb-5">
          <h1 className="text-white text-4xl font-bold mb-4 relative z-10">
            Create Your Custom Video
          </h1>
          <div className="w-32 h-1 mx-auto md:mx-0 bg-gradient-to-r from-pink-500 to-purple-400 rounded mb-6 relative z-10"></div>
          <p className="text-gray-400 text-lg max-w-md mx-auto md:mx-0 relative z-10">
            Customize your video by entering the text you want to display, choosing a background color, and setting the duration. Click the button to generate your custom video.
          </p>
        </div>

        <div className="w-full max-w-md bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl overflow-hidden relative p-6 mx-4 md:mx-6">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-10 blur-xl"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-10 blur-xl"></div>

          <div className="relative z-10">
            <form onSubmit={formik.handleSubmit} className="space-y-6" ref={formRef}>
              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-900">
                  Enter Text for Video:
                </label>
                <input
                  type="text"
                  name="text"
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  className={`mt-2 p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-purple-300 transition duration-300 ${formik.touched.text && formik.errors.text ? 'border-red-500' : 'border-gray-400'} bg-gray-300 text-gray-900`}
                />
                {formik.touched.text && formik.errors.text ? (
                  <div className="text-red-800 text-sm mt-1">{formik.errors.text}</div>
                ) : null}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-900">
                  Background Color:
                </label>
                <input
                  type="color"
                  name="background"
                  value={formik.values.background}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  className={`mt-2 p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-purple-300 transition duration-300 ${formik.touched.background && formik.errors.background ? 'border-red-500' : 'border-gray-400'} bg-gray-300 text-gray-700`}
                />
                {formik.touched.background && formik.errors.background ? (
                  <div className="text-red-800 text-sm mt-1">{formik.errors.background}</div>
                ) : null}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-900">
                  Duration (seconds):
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formik.values.duration}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  className={`my-2 p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-purple-300 transition duration-300 ${formik.touched.duration && formik.errors.duration ? 'border-red-500' : 'border-gray-400'} bg-gray-300 text-gray-700`}
                />
                {formik.touched.duration && formik.errors.duration ? (
                  <div className="text-red-900 text-sm mt-1">{formik.errors.duration}</div>
                ) : null}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white text-base font-bold rounded-lg shadow-md hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-400 transition-transform duration-300 transform hover:scale-105"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Generating...' : 'Generate Video'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default VideoCreate;
