import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/image/logoipsum-logo-15.svg";
import Button from "../Ui/Button";
import NavLinks from "./NavLinks";
import styles from "../../style";
import Avatar from "../Ui/Avatar";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-primary font-poppins text-white">
      <div
        className={`${styles.boxWidth} flex md:flex-row flex-col items-center font-normal justify-between`}
      >
        <div className="z-50 p-5 md:w-auto w-full flex justify-between">
          <img src={Logo} alt="logo" className="md:cursor-pointer" />
          <div className="md:hidden py-5 flex justify-center items-center gap-x-4">
            <Link to="/">Login</Link>
            <Link to="/">
              <Button content="Sign up" />
            </Link>
            <Avatar/>
          </div>
          <div className="text-3xl my-auto md:hidden" onClick={() => setOpen(!open)}>
            <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
          </div>
        </div>

        <ul className="md:flex hidden items-center gap-8">
          <li>
            <Link to="/" className="py-7 px-3 inline-block">
              Home
            </Link>
          </li>
          <NavLinks />
        </ul>
        
        {/* <form  className="md:flex hidden items-center gap-8">
          
          <div class="relative">
            
            <input
              type="search"
              id="default-search"
              class="block p-3 pr-10 w-full text-sm text-black bg-white rounded-[2px] ring-0 focus:ring-0 focus:border-transparent"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              class="text-black absolute right-2.5 bottom-1 bg-transparent hover:bg-black-gradient-2 focus:ring-transparent focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </div>
        </form> */}

        <div className="md:flex hidden justify-center items-center gap-x-6">
          <Link to="/">Login</Link>
          <Link to="/">
            <Button content="Sign up" />
          </Link>
          <Avatar/>
        </div>

        {/* mobile navbar */}

        <ul
          className={`md:hidden bg-primary absolute w-full h-full bottom-0 py-24 pl-4 duration-500 ${
            open ? "left-0" : "left-[-100%]"
          }`}
        >
          <li>
            <Link to="/" className="py-7 px-3 inline-block">
              Home
            </Link>
          </li>
          <NavLinks />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
