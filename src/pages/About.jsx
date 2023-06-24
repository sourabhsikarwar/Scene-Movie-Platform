import React from "react";
import styles from '../style'
import Button from '../components/Ui/SecButton'
import Contributor from "../components/Contributor";
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
              <h1 className={`${styles.heading1} mt-20  text-gray-100`}>
                About us
              </h1>   
            </div>
            </section>

        <p className=" my-20  text-2xl leading-10  text-center">
            <strong >Welcome to</strong> <br/>
           <span className={`${styles.heading2} text-black mb-3 `} > scene movie platform </span><br/>
             we're passionate about bringing you the best entertainment experience right at your
            fingertips.<br/>
             Our goal is to provide you with a platform that offers a 
            vast collection of movies, TV shows, and documentaries .
            <p className="mb-5">We welcome contributions from developers like you to help make our project even better</p>
          <Button content="contribute"/>
          </p>
    <AdminAbout/>
    <Contributor/>
    </div>

  );
};

export default About;
