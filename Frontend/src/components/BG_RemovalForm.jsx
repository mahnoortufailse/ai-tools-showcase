import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BG_RemovalForm() {
  const [bgRemove, setBgRemove] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      image: null,
    },
    validationSchema: Yup.object({
      image: Yup.mixed().required('A file is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append("image", values.image);

      try {
        const res = await axios.post('http://localhost:9000/remove-bg', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob',
        });

        const blob = new Blob([res.data], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        navigate(`/backgroundGenerate/${encodeURIComponent(url)}`);

        // Optional: Convert blob to base64 and store in state if needed
        const reader = new FileReader();
        reader.onloadend = () => setBgRemove(reader.result);
        reader.readAsDataURL(blob);

        toast.success('Background removed successfully!');
      } catch (error) {
        console.error('Error removing background:', error);
        toast.error('Failed to remove background. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <ToastContainer />
      <div className='flex justify-center mb-14 max-[640px]:mb-3'>
        <div>
          <form onSubmit={formik.handleSubmit}>
            {/* Input */}
            <div className="input border border-gray-500 px-2 py-2 rounded-lg bg-white mb-5">
              <input
                type="file"
                onChange={(e) => {
                  formik.setFieldValue('image', e.currentTarget.files[0]);
                }}
                className="text-sm text-black file:mr-5 file:py-1 file:px-3 file:text-sm file:font-semibold file:border-0 file:rounded-md file:bg-gray-400 file:text-gray-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700 lg:w-[58em] bg-white/5 backdrop-blur-lg"
              />
              {formik.touched.image && formik.errors.image ? (
                <div className="text-red-500 text-sm">{formik.errors.image}</div>
              ) : null}
            </div>

            {/* Output */}
            <div className="mb-5 items-center mx-auto">
              {formik.values.image && (
                <div className="border-2 border-gray-500 rounded-l-lg border-dashed flex justify-center p-2 w-40 lg:w-80 items-center mx-auto">
                  <img className="w-90 h-60" src={URL.createObjectURL(formik.values.image)} alt="" />
                </div>
              )}
            </div>

            {/* Remove Background Button */}
            <div className="flex justify-center mb-5">
              <button
                type="submit"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                disabled={!formik.values.image || formik.isSubmitting} // Disable if no image selected or submitting
              >
                Remove Background
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
