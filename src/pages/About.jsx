import React from "react";
import styles from '../style'
import img1 from '../assets/image/bg1.png'
import Contributor from "../components/Contributor";
import Profile from "../components/Profile";
import AdminAbout from "../components/AdminAbout";
const About = () => {
  return (
    <div>
    <section
        className="section-bg text-gray-600 body-font overflow-hidden bg-[#656565cf] bg-blend-multiply"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
            height:"35vh"
        }}
        >
            <div className='md:w-full lg:pr-24 md:pr-16 flex flex-col md:items-center md:text-center md:mb-0 items-center text-center'>
              <h1 className={`${styles.heading1} mb-2 text-gray-100`}>
                About us
              </h1>   
            </div>
            </section>

        <p className=" mt-20 md:text-center  ">
            <strong >Welcome to</strong> <br/>
           <span className={`${styles.heading3} `} > scene movie platform </span><br/>
             we're passionate about bringing you the best entertainment experience right at your
            fingertips.<br/>
             Our goal is to provide you with a platform that offers a 
            vast collection of movies, TV shows, and documentaries .
          </p>
    <AdminAbout/>
    <Contributor/>
    </div>

  );
};

export default About;
