import React from "react";
import { Link } from "react-router-dom";
import Notfound from "../assets/image/notfound.webp";
const NotFound404 = () => {
  return (
    <div className="error-container bg-gray-200 dark:bg-primary">
      <div className="error-text">
        <h1>Error Page 404 </h1>
      <h2 className="text-sky-400 dark:text-gradient font-poppins font-medium md:text-[24px] text-[24px] leading-relaxed mb-4">
        Opps! Page not found
        <br /> Sorry, the page you're looking for doesn't exist.
      </h2>
      <br />
      <Link
        className="bg-blue-gradient border-0 text-black px-4 py-2 rounded shadow"
        to="/"
      >
        Back to Home
      </Link>
      </div>
      <img className="ops" src={Notfound} alt="404 Not Found" loading='lazy'/>
    </div>
  );
};

export default NotFound404;
