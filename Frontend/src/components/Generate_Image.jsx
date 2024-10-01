import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Btn from './Btn';

const Generate_Image = () => {
  const formik = useFormik({
    initialValues: {
      description: '',
    },
    validationSchema: Yup.object({
      description: Yup.string()
        .required('Description is required.'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm, setFieldValue }) => {
      try {
        const response = await axios.post('http://localhost:9000/generate-image', { description: values.description });
        console.log(response); // Log the full response for debugging
        const { imageUrl } = response.data;
        setFieldValue('imageUrl', imageUrl);
        toast.success('Image generated successfully!');
        resetForm();
      } catch (error) {
        console.error('Error generating image:', error);
        toast.error('Failed to generate image. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }  
  });

  const handleDownload = (imageUrl) => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'generated-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast.error('No image available to download');
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-hero-pattern bg-center bg-cover bg-no-repeat">
      <form 
        onSubmit={formik.handleSubmit} 
        className="shadow-md rounded px-20 pt-6 pb-8 mb-6 w-full max-[650px]:px-5 max-[650px]:pt-24"
      >
        <div className="w-full text-center mb-8 items-center">
          <h1 className="text-5xl font-bold text-white mb-4">Image Generator</h1>
          <div className="w-32 h-1 mx-auto bg-gradient-to-r from-pink-500 to-purple-400 rounded mb-6 relative z-10"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Generate customizable images using AI! Download the generated image for your project.
          </p>
        </div>
        <input
          type="text"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`shadow border w-full py-4 px-3 text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-black-100/5 backdrop-blur-lg rounded-lg ${formik.touched.description && formik.errors.description ? 'border-red-500' : ''}`}
          placeholder="Enter image description"
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="text-red-500 text-sm mb-2">{formik.errors.description}</div>
        ) : null}
        
        {formik.values.imageUrl && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-center">Generated Image:</h3>
            <img
              src={formik.values.imageUrl}
              alt="Generated"
              className="mt-4 border rounded shadow-lg max-w-full"
            />
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleDownload(formik.values.imageUrl)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Download Image
              </button>
            </div>
          </div>
        )}
        <div className="flex items-center justify-center mt-5">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Generating...' : 'Generate Image'}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      <Btn text={"See what Ai Art other users are creating"}  link={"/images"} />

    </div>
  );
};

export default Generate_Image;
