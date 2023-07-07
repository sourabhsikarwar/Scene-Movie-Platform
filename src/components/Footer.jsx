import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/image/slide.webp";
import {AiFillGithub ,AiFillTwitterCircle ,AiFillLinkedin ,AiFillInstagram,AiFillFacebook} from "react-icons/ai"

const Footer = () => {

  const hoverEffect = "group flex items-center transition ease-out duration-200 hover:text-gray-400";
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className='bg-gray-200 text-gray-900 dark:bg-primary dark:text-dimWhite body-font'>
    <div className="w-80vw mx-auto max-w-1200px"style={{ marginTop: "-12px"}}>
      <div className="flex justify-around flex-wr mtap" style={{display:"flex",flexDirection:"column"}}>
      <div className="mb-4 mt-10 ml-auto mr-auto">
           <ul style={{display:"flex"}}>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50 ml-3 mr-3" style={{fontSize:"30px"}}>
                <a href="https://github.com/sourabhsikarwar/Scene-Movie-Platform" aria-label="Follow me on Github" target="_blank" className={hoverEffect}><AiFillGithub className="mr-1" /></a>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50 ml-3 mr-3" style={{fontSize:"30px"}}>
                   <a href="#" aria-label="Follow me on Twitter"  className={hoverEffect}><AiFillTwitterCircle className="mr-1 transition ease duration-200 group-hover:text-sky-500" /></a>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50 ml-3 mr-3" style={{fontSize:"30px"}}>
                   <a href="https://www.linkedin.com/in/sourabhsikarwar/" target="_blank" aria-label="Follow me on Linkedin" className={hoverEffect}><AiFillLinkedin className="mr-1 transition ease duration-200 group-hover:text-sky-600" /></a>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50 ml-3 mr-3" style={{fontSize:"30px"}}>
                   <a href="#" aria-label="Follow me on Instagram" className={hoverEffect}><AiFillInstagram className="mr-1 transition ease duration-200 group-hover:text-rose-500" /></a>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50 ml-3 mr-3" style={{fontSize:"30px"}}>
                   <a href="#" aria-label="Follow me on Facebook" className={hoverEffect}><AiFillFacebook className="mr-1 transition ease duration-200 group-hover:text-blue-700" /></a>
                </li>
             </ul>
        </div>
      <div className="mb-4 mt-4 ml-auto mr-auto">
        <ul className="list-none m-0 p-0" style={{display: "flex",flexWrap: "wrap"}}>
               <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50 ml-6 mr-6">
                <Link to="/" className={hoverEffect}>Home</Link>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50 ml-6 mr-6">
                <Link to="/about" className={hoverEffect}>About</Link>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50 ml-6 mr-6">
                <Link to="/recommend" className={hoverEffect}>For You</Link>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50 ml-6 mr-6">
                <Link to="/profile" className={hoverEffect}>Profile</Link>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50 ml-6 mr-6">
                <Link to="/favourite" className={hoverEffect}>TV Shows</Link>
                </li>
        </ul>
        </div>
      <div className="mb-10 mt-4 ml-auto mr-auto">
           <ul style={{display:"flex"}}>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50 ml-6 mr-6">
                   <a href="#" className={hoverEffect}>Visit Help Center</a>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50 ml-6 mr-6">
                   <a href="#"className={hoverEffect}>Share Feedback</a>
                </li>
             </ul>
        </div>
     
      </div>

    </div>
      <div className="flex flex-row justify-center w-full border-y-2 items-center gap-8 border-black  ">
            <div className="flex flex-row items-center">
            <Link
          className="flex title-font font-medium items-center md:justify-start justify-center"
          to="/"
        >
          <img src={logo} className="w-32 invert -hue-rotate-180 dark:invert-0 dark:hue-rotate-0" alt="logo" loading='lazy' width={128} height={48}/>
        </Link>
        </div>
        <p>© {currentYear} Scene. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;
