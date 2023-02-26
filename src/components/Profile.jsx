import React, { useState } from "react";
import { useUserAuth } from "../context/authContext";
import avatar from "../assets/image/avatar.jpg";

const Profile = () => {
  const { userData } = useUserAuth();

  return (
    <section className="text-white body-font bg-primary">
      <div className="flex items-center lg:w-3/5 mx-auto pb-10 mb-10 sm:flex-row flex-col">
        <div className="sm:w-36 sm:h-36 h-24 w-24 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0 overflow-hidden">
          <img src={avatar} alt="" />
        </div>
        <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
          <h2 className="text-white text-lg title-font font-medium mb-2">
            Sourabh Sikarwar
          </h2>
          <p className="leading-relaxed text-base">
            Blue bottle crucifix vinyl post-ironic four dollar toast vegan
            taxidermy. Gastropub indxgo juice poutine.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
