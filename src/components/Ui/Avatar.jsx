import React from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/authContext";
import avatar from "../../assets/image/avatar.jpg";

const Avatar = () => {
  const { logout } = useUserAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="relative group">
      <img
        src={avatar}
        alt="avatar"
        className="w-[40px] h-[40px] rounded-full object-cover" loading='lazy'
      />

      <div className="absolute top-15 right-[4px] hidden group-hover:block hover:block ease-in w-[160px]">
        <div className="py-2">
        </div>
        <ul className="text-dimWhite bg-secondary px-3 py-4 rounded font-light text-sm">
          <Link to="/profile">
            <li className=" hover:text-white px-4 py-2 rounded">Your Profile</li>
          </Link>
          <Link to="/favourite">
            <li className=" hover:text-white px-4 py-2 rounded">Favourites</li>
          </Link>
          <hr className="border-primary my-2" />
          <li className="hover:bg-primary hover:text-white px-4 py-2 rounded">
            <button onClick={handleLogout}>Log out</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Avatar;
