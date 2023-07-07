import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../style";
import bg from "../assets/image/bg2.webp";
import { useUserAuth } from "../context/authContext";
import { toast } from 'react-toastify';
import { useLocation } from "react-router-dom";

const Reset = () => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const { passwordReset } = useUserAuth();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateInputs = () => {
    const { email } = data;
    const errors = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleReset(e);
    }
  };
  
  const handleReset = async (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
        console.log("Inside handlereset")
        await toast.promise(
           passwordReset(data.email),
            {
                success: "Email sent",
                error: "Error sending Email"
            }
        );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section
      className="text-gray-600 body-font"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPositionX: "center",
      }}
    >
      <div
        className={`${styles.boxWidth} mx-auto flex flex-wrap items-center md:px-0 px-8 h-max`}
      >
        <div className="lg:w-2/6 md:w-1/2 bg-primary rounded-lg p-8 flex flex-col md:mx-auto w-full my-16">
          <h2 className={`text-gradient ${styles.heading3} mb-1`}>Reset password</h2>
          <p class="text-gray-500 dark:text-gray-400 mb-4">Enter the email associated with your account and we will send an email with instructions to reset your password.</p>
          {error && <p className="text-red-600">{error}</p>}
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-8 text-sm text-white">
              Email
            </label>
            <input
              value={data.email}
              type="email"
              id="email"
              name="email"
              placeholder="xyz@gmail.com"
              className={`w-full bg-white rounded border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out z-0`}
              onChange={handleInputs}
              onKeyDown={handleKeyDown}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <button
            className="text-black bg-blue-gradient mt-2 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={handleReset}
          >
            Send Mail
          </button>
          <div className="flex justify-center mt-6">

          <p className="leading-8 text-sm text-gray-900  dark:text-white"></p>
          <Link
                to="/login"
                className="text-sky-600 dark:text-gradient"
                >
                ← Back to Login
              </Link>
                  </div>
        </div>
      </div>
    </section>
  );
};

export default Reset;
