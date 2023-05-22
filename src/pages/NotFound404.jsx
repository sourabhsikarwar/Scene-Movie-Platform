import React from "react";
import { Link } from "react-router-dom";
import Notfound from "../assets/image/notfound.png";
const NotFound404 = () => {
  return (
    <div className="error-container">
      <img className="ops" src={Notfound} alt="404 Not Found" />
      <br />
      <h3 className="text-gradient font-poppins font-medium md:text-[24px] text-[24px] text-white leading-relaxed mb-4">
        Opps! Page not found
        <br /> BSorry, the page you're looking for doesn't exist.
      </h3>
      <br />

      <Link
        className="bg-blue-gradient border-0 text-black px-4 py-2 rounded shadow"
        to="/"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound404;
