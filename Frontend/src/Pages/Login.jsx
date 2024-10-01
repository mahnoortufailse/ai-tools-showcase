/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate for navigation
import SuccessModal from "../components/SuccessModal";
import axios from "axios";
import toast from "react-hot-toast"; // Ensure using the right toast library
import { StarsCanvas } from "../components";

const validate = (values) => {
  const errors = {};

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

const Login = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate(); // Add navigation hook

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (data) => {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      try {
        const res = await axios.post(
          "http://localhost:9000/user/login",
          userInfo
        );
        if (res.data) {
          toast.success("Logged in Successfully!");

          // Store additional user data if needed
          localStorage.setItem("Users", JSON.stringify(res.data.user));

          setShowSuccessModal(true);
          setTimeout(() => {
            setShowSuccessModal(false); // Hide the success modal after 1 second
            navigate("/"); // Navigate to a protected route or dashboard after login
          }, 2000);

          formik.resetForm();
        }
      } catch (err) {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        }
      }
    },
  });

  return (
    <>
      <div>
        <div className="bg-primary bg-cover bg-no-repeat bg-center relative z-0">
          <div className="h-screen flex justify-center items-center">
            <div className="bg-black-100/10 backdrop-blur-lg mx-4 p-10 rounded shadow-md w-full md:w-1/2 lg:w-1/3 border border-gray-600">
              <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block font-semibold text-gray-300 mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none border border-gray-600 bg-black-100/20 backdrop-blur-lg"
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                  ) : null}
                </div>

                <div className="mb-4">
                  <label
                    className="block font-semibold text-gray-300 mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none border-gray-600 bg-black-100/20 backdrop-blur-lg"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm">{formik.errors.password}</div>
                  ) : null}
                </div>
                <p className="text-sm dark:text-gray-300 text-black mb-4">
                  You don't have an account?{" "} 
                  <Link
                    to="/signup"
                    className="underline text-blue-500 cursor-pointer text-base"
                  >
                    Signup
                  </Link>{" "}
                </p>
                <div className="mb-6">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
          <StarsCanvas/>
        </div>

        {/* Display the success modal if showSuccessModal is true */}
        {showSuccessModal && <SuccessModal message="Logged in Successfully" />}
      </div>
    </>
  );
};

export default Login;
