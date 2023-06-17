import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/image/slide.png";
import NavLink from "./NavLink";
import styles from "../../style";
import Avatar from "../Ui/Avatar";
import { useUserAuth } from "../../context/authContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUserAuth();
  const location = useLocation();

  return (
    <nav
      className="bg-primary font-poppins text-dimWhite h-[90px] px-4"
      style={{ position: "sticky", top: 0, zIndex: 20 }}
    >
      <div
        className={`${styles.boxWidth} flex md:flex-row flex-col items-center font-normal justify-between`}
      >
        <div className="z-50 px-4 py-2 md:w-auto w-full flex justify-between">
          <img
            src={Logo}
            alt="logo"
            className="md:cursor-pointer h-12 my-auto" loading='lazy'
          />
          <div className="md:hidden py-5 flex justify-center ml-auto mr-4 items-center self-end gap-x-4">
            {user ? (
              <Avatar view="center" />
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-white duration-200"
                >
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
        <ul className="md:flex hidden items-center font-medium h-[90px] z-50">
          <li>
            <Link
              to="/"
              className={`navLink ${location.pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`navLink ${
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              About
            </Link>
          </li>
          <NavLink />
          <li>
            <Link
              to="/"
              className={`navLink ${
                location.pathname === "/TvShows" ? "active" : ""
              }`}
            >
              TV Shows
            </Link>
          </li>
          <li>
            <Link
              to="/recommend"
              className={`navLink ${
                location.pathname === "/recommend" ? "active" : ""
              }`}
            >
              For You
            </Link>
          </li>
        </ul>

        {/* normal web view  */}

        <div className="md:flex hidden justify-center items-center gap-x-6 z-50">
          {user ? (
            <Avatar view="end" />
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-white duration-200"
              >
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
          className={`md:hidden bg-primary absolute w-full top-[90px] z-50 py-5 pl-4 duration-500  ${
            open ? "left-0" : "left-[-100%]"
          }`}
          style={{ zIndex: "1" }}
        >
          <li>
            <Link
              to="/"
              className={`navLink ${location.pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>
          </li>
          <NavLink />
          <li>
            <Link
              to="/"
              className={`navLink ${
                location.pathname === "/TvShows" ? "active" : ""
              }`}
            >
              TV Shows
            </Link>
          </li>
          <li>
            <Link
              to="/recommend"
              className={`navLink ${
                location.pathname === "/recommend" ? "active" : ""
              }`}
            >
              For You
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
