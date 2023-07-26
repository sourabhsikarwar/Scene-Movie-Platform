import React, { useState } from "react";
import { useUserAuth } from "../context/authContext";
import avatar from "../assets/image/avatar.webp"
import show from "../assets/image/show.webp";
import hide from "../assets/image/hide.webp";
import { toast } from 'react-toastify';
import styles from "../style";
import { FaUserLock } from 'react-icons/fa';
import bg from "../assets/image/bg2.webp";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, profileUpdate } = useUserAuth();
  const [passwordType, setPasswordType] = useState("password");
  const [data, setData] = useState({
    username: user?.displayName,
    email: user?.email,
    image: user?.photoURL,
    contact: user?.contact,
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateInputs = () => {
    const errors = {};

    // Validate Username
    if (!data.username.trim()) {
      errors.username = "Full Name is required";
    }

    // Validate Email
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email address";
    }

    // Validate Password
    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password should be at least 6 characters long";
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
        profileUpdate(data.username, data.email, data.image, data.password, null),
        {
          pending: 'Updating profile...',
          success: 'Profile update successful',
          error: 'Error updating profile'
        }
      );
    } catch (err) {
      console.log(err)
      setError("Error updating profile");
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
      className="bg-gray-100  text-gray-900 dark:bg-primary dark:text-white body-font justify-center flex items-center h-full"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPositionX: "center",
      }}
    >
      <div className="flex w-[60%] bg-gray-100 dark:bg-primary sm:dark:bg-secondary px-0 md:px-[50px] md:mx-0 mx-5 rounded-lg mt-[30px] mb-[34px] md:flex-row gap-10 items-center">
        
        <div className="border bg-gray-100 p-10 rounded-lg dark:bg-secondary flex flex-col w-[80%] h-[100%]">
         <div className=" flex flex-col items-center justify-center mb-4">
          <img src={data.image ? data.image : avatar} alt='' className="mb-5 h-28 w-28 rounded-full" />
          <h1 className="text-sky-500 font-semibold mb-5">{data.username}</h1>
         </div>
          <Link to="/">

          <button  className="p-2 border drop-shadow-lg bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md w-full mb-4 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500">
            Back to home
          </button>
          </Link>
          <button className="p-2 border drop-shadow-lg bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md w-full mb-4 hover:bg-sky-500  hover:text-white dark:hover:bg-sky-500">
            Edit Profile
          </button>
          <button className="p-2 border drop-shadow-lg bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md w-full mb-4 hover:bg-sky-500  hover:text-white dark:hover:bg-sky-500">
            Settings
          </button>
          <button className="p-2 border drop-shadow-lg bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md w-full mb-4 hover:bg-sky-500  hover:text-white dark:hover:bg-sky-500">
            Favorites
          </button>
          <button className="p-2 border drop-shadow-lg bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md w-full hover:bg-sky-500  hover:text-white dark:hover:bg-sky-500">
            Log out
          </button>
        </div>

        <div className="w-full">
          <div className="bg-gray-300 text-gray-900 dark:bg-primary rounded-lg p-8 flex flex-col md:mx-auto w-full my-16 relative">
            <h2 className={`text-center text-sky-400 dark:text-gradient ${styles.heading3}  items-center justify-center m-5 mx-auto`}>Update Profile</h2>
            {error && <p className="text-red-600">{`${error}`}<FaUserLock style={{ display: "inline-block", marginLeft: "10px" }} /></p>}
            <div className="relative mb-4 w-full">
              <label htmlFor="username" className="leading-8 text-sm text-gray-900 dark:text-white font-semibold">
                Username
              </label>
              <input
                value={data.username}
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                className={`drop-shadow-lg w-full bg-white rounded border ${errors.username ? "border-red-500" : "border-gray-300"
                  } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out z-0`}
                onChange={handleInputs}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
              {errors.username && <p className="text-red-500">{errors.username}</p>}
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-8 text-sm text-gray-900 dark:text-white font-semibold">
                Email
              </label>
              <input
                value={data.email}
                type="email"
                id="email"
                name="email"
                placeholder="xyz@gmail.com"
                className={`drop-shadow-lg w-full bg-white rounded border ${errors.email ? "border-red-500" : "border-gray-300"
                  } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out z-0`}
                onChange={handleInputs}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="relative mb-4">
              <label htmlFor="contact" className="leading-8 text-sm text-gray-900 dark:text-white font-semibold">
                Contact Number
              </label>
              <input
                // value={data.contact}
                type="contact"
                id="contact"
                name="contact"
                placeholder="+91 12345 67890"
                className={`drop-shadow-lg w-full bg-white rounded border ${errors.email ? "border-red-500" : "border-gray-300"
                  } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out z-0`}
                onChange={handleInputs}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-8 text-sm text-gray-900 dark:text-white font-semibold">
                Password
              </label>
              <input
                value={data.password}
                type={passwordType}
                id="password"
                name="password"
                placeholder="Enter your password"
                className={`drop-shadow-lg w-full bg-white rounded border ${errors.password ? "border-red-500" : "border-gray-300"
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
              className="text-black drop-shadow-lg hover:bg-indigo-500 bg-blue-gradient mt-2 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
