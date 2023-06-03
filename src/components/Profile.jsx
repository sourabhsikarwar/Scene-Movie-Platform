import React from "react";
import { useUserAuth } from "../context/authContext";
import avatar from "../assets/image/avatar.jpg";
import { Link } from "react-router-dom";

const Profile = () => {
  const { userData } = useUserAuth();

  return (
    <section className="text-white body-font bg-primary  justify-center flex items-center">
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
      <div className="bg-secondary h-fit py-[50px] w-fit md:px-[100px] px-[50px] md:mx-0 mx-10 rounded-lg mt-[60px] mb-[34px]  flex md:flex-row flex-col gap-10 items-center">
        {/* Left cont */}
        <div className="md:items-center justify-center flex ">
          {/* Avtr */}
          <div className="sm:w-[250px] sm:h-[250px] h-[200px] w-[200px]  my-4 md:my-8 inline-flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-500 flex-shrink-0 overflow-hidden hover:scale-105 transition-transform ">
            <img src={avatar} alt="" />
          </div>
        </div>
        <div className="text-gray-400 font-medium md:w-full h-full gap-5 flex flex-col justify-center ">
          {userData.name ? (<h1 className="text-white text-left font-poppins text-3xl mx-5 mb-5">{userData.name}</h1>):(<h1 className="text-white text-left font-poppins text-3xl mx-5 mb-5">Welcome, Username</h1>)}
          <div className="flex md:flex-row flex-col mx-5  gap-5">
              <h2 className="text-lg text-white font-poppins">Email :</h2>
              {userData.email ? (<h2 className="text-lg font-poppins body-font">{userData.email}</h2>) : (<h2 className="text-lg font-poppins body-font">user@gmail.com</h2>)}
          </div>
          <div className="flex md:flex-row flex-col mx-5  gap-5">
              <h2 className="text-lg text-white font-poppins">Contact no :</h2>
              {userData?.contact ? (<h2 className="text-lg font-poppins body-font">{userData.contact}</h2>) : (<h2 className="text-lg font-poppins body-font">+91xxxxxxxx</h2>)}
          </div>
          <div className="flex md:flex-row flex-col mx-5  gap-5">
              <h2 className="text-lg text-white font-poppins">Date of Birth :</h2>
              {userData?.Dob ? (<h2 className="text-lg font-poppins body-font">{userData.name}</h2>) : (<h2 className="text-lg font-poppins body-font">DD/MM/YY</h2>)}
          </div>
        
        </div>
      </div>
    </section>
  );
};

export default Profile;
