import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../style";
import bg from "../assets/image/bg2.webp";
import { useUserAuth } from "../context/authContext";
import show from "../assets/image/show.webp";
import hide from "../assets/image/hide.webp";
import { toast } from 'react-toastify';
import OAuth from "./OAuth";
import  { FaUserLock } from 'react-icons/fa';

const Login = () => {

  const [passwordType, setPasswordType] = useState("password");
  
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useUserAuth();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateInputs = () => {
    const { email, password } = data;
    const errors = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    }


    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setError("");
    try {
      await toast.promise(
        login(data.email, data.password),
        {
          pending: 'Logging in...',
          success: 'Login in successful',
          error: 'Error logging in'
        }
    );
      navigate("/");
    } catch (err) {
      setError("Username or password didn't match");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const passwordToggle = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  return (
    <section
      className="text-gray-900 dark:text-gray-600 body-font"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPositionX: "center",
      }}
    >
      <div
        className={`${styles.boxWidth} mx-auto flex flex-wrap items-center md:px-0 px-8 h-max`}
      >
        <div className="lg:w-2/6 md:w-1/2 bg-gray-300 text-gray-900 dark:bg-primary rounded-lg p-8 flex flex-col md:mx-auto w-full my-16">
          <h2 className={`text-gradient ${styles.heading3} mb-4`}>Login</h2>
          {error && <p className="text-red-600">{`${error}`}<FaUserLock style={{display:"inline-block", marginLeft:"10px"}} /></p>}
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-8 text-sm text-gray-900 dark:text-white">
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
              autoComplete="off"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-8 text-sm text-gray-900 dark:text-white">
              Password
            </label>
            <input
              value={data.password}
              type={passwordType}
              id="password"
              name="password"
              className={`w-full bg-white rounded border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out z-0`}
              onChange={handleInputs}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={passwordToggle}
              className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center pointer-events-cursor-pointer"
            >
              <img
                height={30}
                width={30}
                src={passwordType === "password" ? hide : show}
                alt="Toggle password visibility" loading='lazy'
              />
            </button>
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <button
            className="text-black bg-blue-gradient mt-2 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={handleSubmit}
          >
            Login
          </button>
          {/* <hr className="border-gray-600 my-4" /> */}
          <div className="text-gray-900 dark:text-white flex my-4 items-center before:border-t before:flex-1  
            before:border-gray-900 dark:before:border-gray-300 
            after:border-t after:flex-1  
            after:border-gray-900 dark:after:border-gray-300">
              <p className="text-center font-semibold-mx-4">
                OR
              </p>
            </div>
           <OAuth/> {/* Continue with google feature */}

          <div className="flex justify-between">
            <p className="leading-8 text-xs text-gray-900 dark:text-white">
              New to Scene? Try{" "}
              <Link to="/signup" className="text-sky-600 dark:text-gradient">
                Sign Up
              </Link>
            </p>
            <p className="leading-8 text-sm text-gray-900 dark:text-white">
              Forgot password{" "}
              <Link
                to="/passwordReset"
                className="text-sky-600 dark:text-gradient"
              >
                reset
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
