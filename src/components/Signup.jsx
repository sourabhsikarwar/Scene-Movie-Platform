import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/image/bg2.webp";
import styles from "../style";
import { useUserAuth } from "../context/authContext";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import show from "../assets/image/show.webp";
import hide from "../assets/image/hide.webp";
import OAuth from "./OAuth";

const Signup = () => {

  const [passwordType, setPasswordType] = useState("password");
  const [showPassword, setShowPassword] = useState("password");

  const [data, setData] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({}); // Object to store validation errors
  const [error, setError] = useState("");

  const { signUp, addUserData } = useUserAuth();
  const navigate = useNavigate();

  const handleInputs = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const errors = {};

    // Validate Full Name
    if (!data.displayName.trim()) {
      errors.displayName = "Full Name is required";
    }

    // Validate Email
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email address";
    }

    // Validate Contact No.
    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = "Contact No. is required";
    } else if (!/^\d{7,13}$/.test(data.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
    }

    // Validate Date of Birth
    if (!data.dateOfBirth.trim()) {
      errors.dateOfBirth = "Date of Birth is required";
    }

    // Validate Password
    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password should be at least 6 characters long";
    }

    // Validate Confirm Password
    if (!data.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors); // Set the validation errors
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isValid = validateInputs();
    if (!isValid) {
      return;
    }

    try {
      await addUserData(
        data.displayName,
        data.email,
        data.phoneNumber,
        data.dateOfBirth
      );
      await signUp(data.email, data.password);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.message);
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
  const passwordVisibility = () => {
    setShowPassword((type) => (type === "password" ? "text" : "password"));
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
      <div className="container mx-auto flex flex-wrap items-center md:px-0 px-8 h-max">
        <div className="lg:w-2/6 md:w-1/2 bg-gray-300 text-gray-900 dark:bg-primary rounded-lg p-8 flex flex-col md:mx-auto w-full my-16">
          <div>
          <h2 className={`text-gradient ${styles.heading3} mb-4`}>Sign Up</h2>
            
            <OAuth/> {/* Continue with google feature */}
            <div className="text-gray-900 dark:text-white flex my-4 items-center before:border-t before:flex-1  
            before:border-gray-900 dark:before:border-gray-300 
            after:border-t after:flex-1  
            after:border-gray-900 dark:after:border-gray-300">
              <p className="text-center font-semibold-mx-4">
                OR
              </p>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="relative mb-4">
            <label
              htmlFor="full-name"
              className="leading-8 text-sm text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="full-name"
              name="displayName"
              className={`w-full bg-white rounded border ${
                errors.displayName ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
              onChange={handleInputs}
              onKeyDown={handleKeyDown}
            />
            {errors.displayName && (
              <p className="text-red-500">{errors.displayName}</p>
            )}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="email"
              className="leading-8 text-sm text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full bg-white rounded border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
              onChange={handleInputs}
              onKeyDown={handleKeyDown}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="contact-no"
              className="leading-8 text-sm text-gray-900 dark:text-white"
            >
              Contact No.
            </label>
            <PhoneInput 
              id="contact-no"
              name="phoneNumber"
              country="in"
              onChange={(value) => setData({ ...data, phoneNumber: value })}
              onKeyDown={handleKeyDown}
              countryCodeEditable={false}
              inputClass="focus:ring-0"
              inputStyle={{ border: "0px"}}
              containerClass="border-none outline-none focus:ring-0"
              className={`w-full bg-white rounded border ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 text-gray-700 leading-8 transition-colors duration-200 ease-in-out`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="date-of-birth"
              className="leading-8 text-sm text-gray-900 dark:text-white"
            >
              Date Of Birth
            </label>
            <input
              type="date"
              id="date-of-birth"
              name="dateOfBirth"
              className={`w-full bg-white rounded border ${
                errors.dateOfBirth ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
              onChange={handleInputs}
              onKeyDown={handleKeyDown}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500">{errors.dateOfBirth}</p>
            )}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-8 text-sm text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type={showPassword}
              id="password"
              name="password"
              className={`w-full bg-white rounded border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
              onChange={handleInputs}
              onKeyDown={handleKeyDown}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <button
              onClick={passwordVisibility}
              className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center pointer-events-cursor-pointer"
            >
              <img
                height={30}
                width={30}
                src={showPassword === "password" ? hide : show}
                alt="Toggle password visibility"
                loading="lazy"
              />
            </button>
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="confirm-password"
              className="leading-8 text-sm text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              type={passwordType}
              id="confirm-password"
              name="confirmPassword"
              className={`w-full bg-white rounded border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
              onChange={handleInputs}
              onKeyDown={handleKeyDown}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
            <button
              onClick={passwordToggle}
              className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center pointer-events-cursor-pointer"
            >
              <img
                height={30}
                width={30}
                src={passwordType === "password" ? hide : show}
                alt="Toggle password visibility"
                loading="lazy"
              />
            </button>
          </div>
          <button
            className={`${styles.button1} my-2`}
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <p className="leading-8 text-xs text-gray-900 dark:text-white">
            Already a member? Try{" "}
            <Link
              to="/login"
              className="text-sky-600 dark:text-gradient"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
