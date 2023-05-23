import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/image/slide.png";
import NavLink from "./NavLink";
import styles from "../../style";
import Avatar from "../Ui/Avatar";
import { useUserAuth } from "../../context/authContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUserAuth();

  return (
    <nav className="bg-primary font-poppins text-dimWhite">
      <div
        className={`${styles.boxWidth} flex md:flex-row flex-col items-center font-normal justify-between`}
      >
        <Link to='/'>
        <div className="z-50 px-4 py-2 md:w-auto w-full flex justify-between">
          <img
            src={Logo}
            alt="logo"
            className="md:cursor-pointer h-12 my-auto"
          />
          <div className="md:hidden py-5 flex justify-center ml-auto mr-4 items-center self-end gap-x-4">
            {user ? (
              <Avatar view="center" />
              ) : (
                <>
                <Link to="/login" className="hover:text-white duration-200">
                  Login
                </Link>
                <Link to="/signup">
                  <button className={`${styles.button2}`}>Sign Up</button>
                </Link>
              </>
            )}
          </div>
          <div
            className="text-3xl my-auto md:hidden"
            onClick={() => setOpen(!open)}
            >
            <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
          </div>
        </div>
      </Link>

        <ul className="md:flex hidden items-center font-medium">
          <li>
            <Link to="/" className="py-7 px-5 inline-block">
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="py-7 px-5 inline-block">
              About
            </Link>
          </li>
          <NavLink />
          <li>
            <Link to="/" className="py-7 px-5 inline-block">
              TV Shows
            </Link>
          </li>
          <li>
            <Link to="/recommend" className="py-7 px-5 inline-block">
              For You
            </Link>
          </li>
        </ul>

        {/* normal web view  */}

        <div className="md:flex hidden justify-center items-center gap-x-6">
          {user ? (
            <Avatar view="end" />
          ) : (
            <>
              <Link to="/login" className="hover:text-white duration-200">
                Login
              </Link>
              <Link to="/signup">
                <button className={`${styles.button2}`}>Sign Up</button>
              </Link>
            </>
          )}
        </div>

        {/* mobile navbar */}

        <ul
          className={`md:hidden bg-primary absolute w-full top-0 pt-24 pb-12 pl-4 duration-500 ${
            open ? "left-0" : "left-[-100%]"
          }`}
        >
          <li>
            <Link to="/" className="py-7 px-3 inline-block">
              Home
            </Link>
          </li>
          <NavLink />
          <li>
            <Link to="/" className="py-7 px-3 inline-block">
              TV Shows
            </Link>
          </li>
          <li>
            <Link to="/recommend" className="py-7 px-3 inline-block">
              For You
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
