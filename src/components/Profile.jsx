import React from "react";
import { useUserAuth } from "../context/authContext";
import avatar from "../assets/image/avatar.jpg";

const Profile = () => {
  const { userData } = useUserAuth();
  console.log(userData)

  return (
    <section className="text-white body-font bg-primary">
      <div className="flex items-center lg:w-3/5 mx-auto pb-10 mb-10 flex-col">
        <div className="sm:w-36 sm:h-36 h-24 w-24 mx-auto my-4 md:my-8 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 overflow-hidden">
          <img src={avatar} alt="" />
        </div>
        <div className="flex flex-col text-center gap-4">
          <h2 className="text-white text-2xl md:text-4xl title-font font-bold mb-2">
            {userData.name}
          </h2>
          <p className="leading-relaxed text-base text-dimWhite">
            Email: {userData.email}
          </p>
          <p className="leading-relaxed text-base text-dimWhite">
            Contact no.: {userData.contact}
          </p>
          <p className="leading-relaxed text-base text-dimWhite">
            Date of Birth: {userData.Dob}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
