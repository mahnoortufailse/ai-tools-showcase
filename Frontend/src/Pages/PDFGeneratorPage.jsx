/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PDFGeneratorPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = 'Required';
      }
      if (!values.content) {
        errors.content = 'Required';
      }
      return errors;
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:9000/generate-pdf', values, { responseType: 'blob' });

        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'document.pdf');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          toast.success('PDF generated successfully!');
          formik.resetForm();
        } else {
          toast.error('Failed to generate PDF. Please try again.');
        }
      } catch (error) {
        console.error('Error generating PDF:', error);
        toast.error('Error generating PDF: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center p-10 max-[640px]:p-2'>
      <ToastContainer />
      <div className="max-w-7xl mx-auto p-8 mt-28 mb-10 relative max-[600px]:mt-10">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Text Section (Left) */}
          <div className="md:w-1/2 w-full pr-6 items-center py-auto pt-10 max-[640px]:pt-4">
            <h1 className="text-4xl font-extrabold mb-4 text-white tracking-tight">
              Create Your Customized PDF
            </h1>
            <div className="w-32 h-1  md:mx-0 bg-gradient-to-r from-pink-500 to-purple-400 rounded mb-6 relative z-10"></div>
            <p className="text-lg mb-8 text-white leading-relaxed">
              Easily generate a PDF document by entering a title and content in the form. Click 'Generate PDF' to create and download your personalized document instantly. This tool allows you to create professional-looking PDFs tailored to your needs.
            </p>
          </div>

          {/* Form Section (Right) */}
          <div className="md:w-1/2 w-full">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="flex flex-col space-y-2">
                <label htmlFor="title" className="text-xl font-semibold text-gray-400">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  {...formik.getFieldProps('title')}
                  className={`mt-1 block w-full border ${formik.touched.title && formik.errors.title ? 'border-red-600' : 'border-gray-600'} rounded-lg shadow-md focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-black-100 focus:ring-opacity-50 p-3 transition-all transform hover:scale-105 hover:shadow-lg bg-black-100/5 backdrop-blur-lg`}
                  placeholder="Enter the title"
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-red-600 text-sm">{formik.errors.title}</div>
                ) : null}
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="content" className="text-xl font-semibold text-gray-400">
                  Content
                </label>
                <textarea
                  id="content"
                  {...formik.getFieldProps('content')}
                  className={`mt-1 block w-full border ${formik.touched.content && formik.errors.content ? 'border-red-600' : 'border-gray-600'} rounded-lg shadow-md focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-black-100 focus:ring-opacity-50 p-3 transition-all transform hover:scale-105 hover:shadow-lg bg-black-100/5 backdrop-blur-lg `}
                  placeholder="Enter the content"
                  rows="8"
                />
                {formik.touched.content && formik.errors.content ? (
                  <div className="text-red-600 text-sm">{formik.errors.content}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className={`w-full py-3 ${isLoading ? 'bg-gray-600' : 'bg-purple-600'} text-white font-bold text-lg rounded-xl shadow-lg hover:bg-purple-700 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105`}
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate PDF'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFGeneratorPage;
