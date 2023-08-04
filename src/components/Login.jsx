import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../style";
import bg from "../assets/image/bg2.webp";
import { useUserAuth } from "../context/authContext";
import show from "../assets/image/show.webp";
import hide from "../assets/image/hide.webp";
import { toast } from 'react-toastify';
import OAuth from "./OAuth";
import { FaUserLock } from 'react-icons/fa';
import { useLocation } from "react-router-dom";
import validate from "../common/validation";

const Login = () => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const [passwordType, setPasswordType] = useState("password");

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: true, password: true });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useUserAuth();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    const errObj = validate[name](value)
    setErrors((prev) => {
      return { ...prev, ...errObj }
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let submitable = true;
    Object.values(errors).forEach((err) => {
      if (err !== false) {
        submitable = false;
        return;
      }
    })

    setError("");
    if (submitable) {
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
    } else {
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

  return (
    <section
      className="text-gray-900 dark:text-gray-600 body-font"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPositionX: "center",
      }}
    >
      <div className="flex">
        <div className="w-1/2">
          <div className="flex flex-col items-center justify-center w-full ml-5 h-screen ">
            <div className=" p-5 rounded-lg">

              <h1 className="text-9xl text-yellow-500 font-semibold text-center">
                Welcome back to <span className="text-sky-500">Scene !</span>
              </h1>
              <p className="text-xl md:text-3xl text-yellow-500 text-center mt-5">
                Your Gateway to Infinite Entertainment
              </p>
            </div>
          </div>
        </div>
        <div
          className={`${styles.boxWidth} mx-auto flex flex-wrap items-center md:px-0 px-8 h-max w-1/2 align-items justify-center h-screen`}
        >
          <div className="w-[55%] h-[60%]  bg-transparent dark:bg-transparent backdrop-blur-sm border text-gray-900 dark:bg-primary rounded-lg p-8 flex flex-col md:mx-auto w-full my-16" role="form">
            <h2 className={`text-gradient ${styles.heading3} mb-4`} aria-labelledby="login-heading">Login</h2>
            {error && <p className="text-red-600" role="alert" aria-live="assertive">{`${error}`}<FaUserLock style={{ display: "inline-block", marginLeft: "10px" }} /></p>}
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-8 text-sm text-white dark:text-white">
                Email
              </label>
              <input
                value={data.email}
                type="email"
                id="email"
                name="email"
                placeholder="xyz@gmail.com"
                className={`w-full bg-transparent rounded border ${errors.emailError ? "border-red-500" : "border-gray-300"
                  } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out z-0`}
                onChange={handleInputs}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                required
                aria-required="true"
                aria-labelledby="email"
                aria-invalid={errors.emailError ? "true" : "false"}
                aria-describedby="email-error"
              />
              {errors.email && errors.emailError && <p className="text-red-500" id="email-error" role="alert">{errors.emailError}</p>}
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-8 text-sm text-white dark:text-white">
                Password
              </label>
              <input
                value={data.password}
                type={passwordType}
                id="password"
                name="password"
                className={`w-full bg-transparent rounded border ${errors.passwordError ? "border-red-500" : "border-gray-300"
                  } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out z-0`}
                onChange={handleInputs}
                onKeyDown={handleKeyDown}
                aria-required="true"
                aria-labelledby="password"
                aria-invalid={errors.passwordError ? "true" : "false"}
                aria-describedby="password-error"
              />
              {errors.password && errors.passwordError && <p className="text-red-500" id="password-error" role="alert">{errors.passwordError}</p>}
              <button
                onClick={passwordToggle}
                className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center pointer-events-cursor-pointer"
              >
                <img
                  height={30}
                  width={30}
                  src={passwordType === "password" ? hide : show}
                  style={{ filter: "brightness(0) invert(1)" }}
                  alt="Toggle password visibility" loading='lazy'
                />
              </button>
              {errors.password && (
                <p className="text-red-500" role="alert">{errors.password}</p>
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
              <p className="text-center text-white font-semibold-mx-4">
                OR
              </p>
            </div>
            <OAuth /> {/* Continue with google feature */}

            <div className="flex justify-between mt-3">
              <p className="leading-8 text-xs text-white dark:text-white">
                New to Scene? Try{" "}
                <Link to="/signup" className="text-sky-600 dark:text-gradient font-bold">
                  Sign Up
                </Link>
              </p>
              <p className="leading-8 text-sm text-white dark:text-white ">
                Forgot password?{" "}
                <Link
                  to="/passwordReset"
                  className="text-sky-600 dark:text-gradient font-bold"
                >
                  reset
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
