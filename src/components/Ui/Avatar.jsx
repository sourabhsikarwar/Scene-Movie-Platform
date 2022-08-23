import React from "react";
import avatar from "../../assets/image/avatar.jpg";

const Avatar = () => {
  return (
    <div>
      <div className="relative cursor-pointer group">
        <img
          src={avatar}
          alt="avatar"
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
      </div>
      {/* <div className="absolute top-15 right-10 block group-hover:md:block hover:md:block">
        <div className="py-3">
          <div className="w-4 h-4 right-5 absolute mt-1 rotate-45 bg-white"></div>
        </div>
        <ul className="text-black bg-white p-6 rounded">
          <li>Sourabh</li>
          <li>Sourabh</li>
          <li>Sourabh</li>
        </ul>
      </div> */}
    </div>
  );
};

export default Avatar;
