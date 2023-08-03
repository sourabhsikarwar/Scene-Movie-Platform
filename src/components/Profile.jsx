import React, {useState} from "react";
import { useUserAuth } from "../context/authContext";
import avatar from "../assets/image/avatar.webp"
import show from "../assets/image/show.webp";
import hide from "../assets/image/hide.webp";
import { toast } from 'react-toastify';
import styles from "../style";
import  { FaUserLock } from 'react-icons/fa';

const Profile = () => {
  const { user, profileUpdate } = useUserAuth();
  const [passwordType, setPasswordType] = useState("password");
  const [data, setData] = useState({
    username: user?.displayName,
    email: user?.email,
    image: user?.photoURL,
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
    <section className="bg-gray-100 text-gray-900 dark:bg-primary dark:text-white body-font justify-center flex items-center h-full">
      {/* <div className='flex items-center lg:w-3/5 mx-auto pb-10 mb-10 flex-col'>
        <div className='sm:w-36 sm:h-36 h-24 w-24 mx-auto my-4 md:my-8 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 overflow-hidden'>
          <img src={avatar} alt='' />
        </div>
        <div className='flex flex-col text-center gap-4'>
          <h2 className='text-white text-2xl md:text-4xl title-font font-bold mb-2'>
            {userData.name}
          </h2>
          <p className='leading-relaxed text-base text-dimWhite'>
            Email: {userData.email}
          </p>
          <p className='leading-relaxed text-base text-dimWhite'>
            Contact no.: {userData.contact}
          </p>
          <p className='leading-relaxed text-base text-dimWhite'>
            Date of Birth: {userData.Dob}
          </p>
        </div>
      </div> */}
      <div className="bg-gray-100 dark:bg-primary sm:dark:bg-secondary w-fit pt-5 px-0 md:px-[100px] md:mx-0 mx-10 rounded-lg mt-[30px] mb-[34px] flex md:flex-row flex-col gap-10 items-center">
        <div className="bg-gray-300 text-gray-900 dark:bg-primary rounded-lg p-8 flex flex-col md:mx-auto w-full my-16 relative">
          {/* Profile photo */}
        <div className='bg-blue h-1/3 sm:h-28 w-1/3 sm:w-28 mx-auto sm:my-4 md:my-8 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 overflow-hidden sm:absolute -top-20 left-[122px]'>
          <img src={data && data.image ? data.image : avatar} alt='' className="h-28 w-28 rounded-full" />
        </div>
          <h2 className={`text-center text-sky-400 dark:text-gradient ${styles.heading3} mb-4 pt-8 sm:pt-12 mx-auto`}>Update Profile</h2>
          {error && <p className="text-red-600">{`${error}`}<FaUserLock style={{display:"inline-block", marginLeft:"10px"}} /></p>}
          <div className="relative mb-4 w-full">
            <label htmlFor="username" className="leading-8 text-sm text-gray-900 dark:text-white">
              Username
            </label>
            <input
              value={data.username}
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              className={`w-full bg-white rounded border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out z-0`}
              onChange={handleInputs}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}
          </div>
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
              placeholder="Enter your password"
              className={`w-full bg-white rounded border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out z-0`}
              onChange={handleInputs}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={passwordToggle}
              className="absolute bg-[#fff] h-4 inset-y-0 right-0 top-11 mr-3 flex items-center pointer-events-cursor-pointer"
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
            Update
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
