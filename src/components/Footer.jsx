import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/image/slide.webp";
import {AiFillGithub ,AiFillTwitterCircle ,AiFillLinkedin ,AiFillInstagram,AiFillFacebook} from "react-icons/ai"

const Footer = () => {

  const hoverEffect = "group flex items-center transition ease-out duration-200 hover:text-gray-400";
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className='bg-gray-200 text-gray-900 dark:bg-primary dark:text-dimWhite body-font'>
    <div className="w-80vw mx-auto max-w-1200px"style={{ marginTop: "-32px" }}>
      <div className="flex justify-around flex-wr mtap">
      <div className="mb-6 mt-8">
        <div className="font-bold text-lg mb-3 text-black text-opacity-90 dark:text-zinc-50">Quick Links</div>
        <ul className="list-none m-0 p-0">
               <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50">
                <Link to="/" className={hoverEffect}>Home</Link>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50">
                <Link to="/about" className={hoverEffect}>About</Link>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50">
                <Link to="/recommend" className={hoverEffect}>For You</Link>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50">
                <Link to="/profile" className={hoverEffect}>Profile</Link>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50">
                <Link to="/favourite" className={hoverEffect}>TV Shows</Link>
                </li>
        </ul>
        </div>
      <div className="mb-24 mt-8">
           <div className="font-bold text-lg mb-3 text-black text-opacity-90 dark:text-zinc-50">Community</div>
           <ul>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50">
                <a href="https://github.com/sourabhsikarwar/Scene-Movie-Platform" aria-label="Follow me on Github" target="_blank" className={hoverEffect}><AiFillGithub className="mr-1" />Github</a>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50">
                   <a href="#" aria-label="Follow me on Twitter"  className={hoverEffect}><AiFillTwitterCircle className="mr-1 transition ease duration-200 group-hover:text-sky-500" />Twitter</a>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50">
                   <a href="https://www.linkedin.com/in/sourabhsikarwar/" target="_blank" aria-label="Follow me on Linkedin" className={hoverEffect}><AiFillLinkedin className="mr-1 transition ease duration-200 group-hover:text-sky-600" />Linkedin</a>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50">
                   <a href="#" aria-label="Follow me on Instagram" className={hoverEffect}><AiFillInstagram className="mr-1 transition ease duration-200 group-hover:text-rose-500" />Instagram</a>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50">
                   <a href="#" aria-label="Follow me on Facebook" className={hoverEffect}><AiFillFacebook className="mr-1 transition ease duration-200 group-hover:text-blue-700" />Facebook</a>
                </li>
             </ul>
        </div>
      <div className="mb-24 mt-8">
           <div className="font-bold text-lg mb-3 text-black text-opacity-90 dark:text-zinc-50">Need Help?  </div>
           <ul>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50">
                   <a href="#" className={hoverEffect}>Visit Help Center</a>
                </li>
                <li className="leading-8 text-base text-black text-opacity-80 dark:text-zinc-50">
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
