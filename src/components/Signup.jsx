import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/image/bg2.jpg"
import styles from "../style";
import { useUserAuth } from "../context/authContext";

const Signup = () => {

  const [data, setData] = useState({
    name : '',
    email : '',
    password : ''
  })
  const [error, setError] = useState('')
  
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleInputs = async (event) => {
    let inputs = {[event.target.name] : event.target.value}
    setData({...data, ...inputs})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try{
      await signUp(data.email,data.password)
      navigate('/login')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="text-gray-600 body-font"
    style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPositionX: "center",
    }}>
      <div className="container mx-auto flex flex-wrap items-center md:px-0 px-16 h-[90vh]">
        <div className="lg:w-2/6 md:w-1/2 bg-primary rounded-lg p-8 flex flex-col md:mx-auto w-full md:mt-0">
          <h2 className={`text-gradient ${styles.heading3} mb-4`}>
            Sign Up
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="relative mb-4">
            <label
              htmlFor="full-name"
              className="leading-8 text-sm text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={event => handleInputs(event)}
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-8 text-sm text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={event => handleInputs(event)}
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-8 text-sm text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={event => handleInputs(event)}
            />
          </div>
          <button className={`${styles.button1} my-2`} onClick={handleSubmit}>
            Sign Up
          </button>
          <p className="leading-8 text-xs text-white">
            Already a member? Try <Link to="/login" className="text-gradient">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
