/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import { useState } from "react";
import SuccessModal from "../components/SuccessModal";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StarsCanvas } from "../components";

const validate = (values) => {
  const errors = {};

  // Name validation
  if (!values.fullname) {
    errors.fullname = "Name is required";
  }

  // Email validation
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }

  // Password validation
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

const SignUp = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/"; // Default to /functionalities if no prior page


  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (data) => {
      const userData = {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      };

      try {
        const response = await axios.post(
          "http://localhost:9000/user/signup",
          userData
        );
        console.log(response.data);
        if (response.data) {
          // Save JWT token in localStorage
          const { user } = response.data;
          localStorage.setItem("Users", JSON.stringify(user)); // Store user data

          setShowSuccessModal(true);

          // Optionally, redirect the user after successful signup
          setTimeout(() => {
            setShowSuccessModal(false);
            formik.resetForm();
            navigate(from, { replace: true });
          }, 1000);
        } else {
          toast.error("Invalid data!");
        }
      } catch (err) {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        } else {
          toast.error("An error occurred!");
        }
      }
    },
  });

  return (
    <>
      <div className="py-1 bg-hero-pattern bg-cover bg-no-repeat bg-center relative z-0">
        <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="relative px-10 py-10 shadow-lg sm:p-20 bg-black-100/10 backdrop-blur-lg border border-gray-700">
              <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
                <div>
                  <h1 className="text-2xl font-semibold">SignUp</h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        autoComplete="off"
                        name="fullname"
                        type="text"
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-400 text-gray-300 focus:outline-none focus:border-purple-600 bg-black-100 transition duration-200"
                        placeholder="User Name"
                      />
                      <label
                        htmlFor="fullname"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        User Name
                      </label>
                    </div>
                    {formik.touched.fullname && formik.errors.fullname ? (
                      <div className="error text-red-500 text-xs font-poppins italic">
                        {formik.errors.fullname}
                      </div>
                    ) : null}

                    <div className="relative">
                      <input
                        autoComplete="off"
                        name="email"
                        type="text"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-400 text-gray-300 focus:outline-none focus:border-purple-600 bg-black-100 transition duration-200"
                        placeholder="Email Address"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error text-red-500 text-xs font-poppins italic">
                        {formik.errors.email}
                      </div>
                    ) : null}

                    <div className="relative mt-3">
                      <input
                        autoComplete="off"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-400 text-gray-300 focus:outline-none focus:border-purple-600 bg-black-100 transition duration-200"
                        placeholder="Password"
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <div className="error text-red-500 text-xs font-poppins italic">
                        {formik.errors.password}
                      </div>
                    ) : null}

                    <div className="relative">
                      <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="bg-purple-900 text-white rounded-md px-2 py-2"
                      >
                        {formik.isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <p className="mt-4  text-sm text-gray-500">
                Have an account?
                <Link to="/login">
                  <button className="font-semibold leading-6 text-black-600 text-gray-300 text-lg px-2 ">
                    LogIn
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <StarsCanvas />
      </div>

      {showSuccessModal && (
        <SuccessModal
          message="Signup successfully"
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </>
  );
};

export default SignUp;
