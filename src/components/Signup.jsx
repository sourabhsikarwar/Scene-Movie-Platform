import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/image/bg2.webp";
import styles from "../style";
import { useUserAuth } from "../context/authContext";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import show from "../assets/image/show.webp";
import hide from "../assets/image/hide.webp";
import OAuth from "./OAuth";
import { useLocation } from "react-router-dom";
import validate from "../common/validation";

const Signup = () => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

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
  const [errors, setErrors] = useState(validate.initialVal); 
  // Object to store validation errors
  const [error, setError] = useState("");

  const { signUp, addUserData } = useUserAuth();
  const navigate = useNavigate();

  const handleInputs = (e) => {
    const {name, value} = e.target;
    setData({ ...data, [name]: value });
    let errObj = validate[name](value);
    if(name==="confirmPassword") errObj = validate.confirmPassword(value, data.password)
    setErrors((prev)=>{
      return {...prev, ...errObj}
    })
  };

  const handlePhoneChange = (value) => {
     setData((prev)=>{
       return {...prev, phoneNumber: value}
     })
     const errObj = validate.phoneNumber(value);
     setErrors((prev)=>{
       return {...prev, ...errObj}
     })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
     let submitable = true;
     Object.values(errors).forEach((err)=>{
      if(err !== false){
        submitable = false;
        return;
      }
     })

     if(submitable){
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
   }else{
        alert("Please add Valid value in all fields")
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
        <div className="lg:w-2/6 md:w-1/2 bg-gray-300 text-gray-900 dark:bg-primary rounded-lg p-8 flex flex-col md:mx-auto w-full my-16" role="form">
          <div>
          <h2 className={`text-gradient ${styles.heading3} mb-4`} aria-labelledby="signup-heading">Sign Up</h2>
            
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
          {error && <p className="text-red-500" role="alert" aria-live="assertive">{error}</p>}
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
                errors.displayNameError ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
              onChange={handleInputs}
              onKeyDown={handleKeyDown}
              aria-required="true"
              aria-labelledby="display name"
              aria-invalid={errors.displayNameError ? "true" : "false"}
              aria-describedby="display-name-error"
            />
            {errors.displayName && errors.displayNameError &&
              <p className="text-red-500" id="display-name-error" role="alert">{errors.displayNameError}</p>
            }
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
                errors.emailError ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
              onChange={handleInputs}
              onKeyDown={handleKeyDown}
              required
              aria-required="true"
              aria-labelledby="email"
              aria-invalid={errors.emailError ? "true" : "false"}
              aria-describedby="email-error"
            />
            {errors.email && errors.emailError && <p className="text-red-500" id="email-error" role="alert">{errors.emailError}</p>}
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
              onChange={handlePhoneChange}
              onKeyDown={handleKeyDown}
              countryCodeEditable={false}
              inputClass="focus:ring-0"
              inputStyle={{ border: "0px"}}
              containerClass="border-none outline-none focus:ring-0"
              className={`w-full bg-white rounded border ${
                errors.phoneNumberError ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 text-gray-700 leading-8 transition-colors duration-200 ease-in-out`}
              aria-labelledby="phone number"
              aria-invalid={errors.phoneNumberError ? "true" : "false"}
              aria-describedby="phone-number-error"
            />
            {errors.phoneNumber && errors.phoneNumberError  && (
              <p className="text-red-500" id="phone-number-error" role="alert">{errors.phoneNumberError}</p>
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
                errors.dateOfBirthError ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
              onChange={handleInputs}
              onKeyDown={handleKeyDown}
              aria-labelledby="date of birth"
              aria-invalid={errors.phoneNumberError ? "true" : "false"}
              aria-describedby="dateOfBirth-error"
            />
            {errors.dateOfBirth && errors.dateOfBirthError && (
              <p className="text-red-500" id="dateOfBirth-error" role="alert">{errors.dateOfBirthError}</p>
            )}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-8 text-sm text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="relative">
            <input
              type={showPassword}
              id="password"
              name="password"
              className={`w-full bg-white rounded border ${
                errors.passwordError ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
              onChange={handleInputs}
              onKeyDown={handleKeyDown}
              required
              aria-required="true"
              aria-labelledby="password"
              aria-invalid={errors.passwordError ? "true" : "false"}
              aria-describedby="password-error"
            />
            <button
              onClick={passwordVisibility}
              className="absolute inset-y-0 right-0 top-0 pr-3 flex items-center pointer-events-cursor-pointer"
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
          </div>
          {errors.password && errors.passwordError  && (
              <p className="text-red-500">{errors.passwordError}</p>
            )}
          <div className="relative mb-4">
            <label
              htmlFor="confirm-password"
              className="leading-8 text-sm text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <div className="relative">
            <input
              type={passwordType}
              id="confirm-password"
              name="confirmPassword"
              className={`w-full bg-white rounded border ${
                errors.confirmPasswordError ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
              onChange={handleInputs}
              onKeyDown={handleKeyDown}
              aria-required="true"
              aria-labelledby="confirm password"
              aria-invalid={errors.confirmPasswordError ? "true" : "false"}
              aria-describedby="confirmPassword-error"
            />
            <button
              onClick={passwordToggle}
              className="absolute inset-y-0 right-0 top-0 pr-3 flex items-center pointer-events-cursor-pointer"
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
          </div>
          {errors.confirmPassword && errors.confirmPasswordError &&(
              <p className="text-red-500">{errors.confirmPasswordError}</p>
            )}
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
