import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/image/slide.webp";
import NavLink from "./NavLink";
import styles from "../../style";
import Avatar from "../Ui/Avatar";
import { useUserAuth } from "../../context/authContext";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = ({ handleThemeSwitch }) => {
  const [open, setOpen] = useState(false);
  const { user } = useUserAuth();
  const location = useLocation();
  const navbarRef = useRef(null);
  const [check, setCheck] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Track the visibility of the movie dropdown

  // Function to handle clicks links of the navbar
  const handleNavbarLinkClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Function to handle clicks outside of the navbar
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleMode = () => {
    setCheck(!check);
    handleThemeSwitch();
  };

  return (
    <nav
      className="bg-gray-200 dark:bg-primary text-gray-900 dark:text-dimWhite font-poppins h-[90px] px-4 sticky top-0 z-20 grid place-items-center"
    >
      <div
        ref={navbarRef}
        className={`${styles.boxWidth} flex md:flex-row flex-col items-center font-normal justify-between `}
      >
        <div className="z-50 px-4 py-2 md:w-auto w-full flex justify-between">
          <Link to="/" className="flex items-center">
            <img
              src={Logo}
              alt="logo"
              className="invert -hue-rotate-180 dark:invert-0 dark:hue-rotate-0 md:cursor-pointer h-12 my-auto"
              height={48}
              width={128}
            />
          </Link>
          <div className="md:hidden py-5 flex justify-center ml-auto mr-4 items-center self-end gap-x-4">
            {/* Light/Dark mode switch */}
            <div className="relative">
              <input
                id="checkbox"
                type="checkbox"
                className="opacity-0 absolute flex justify-between items-center w-14 h-7 rounded-full p-1 z-10 cursor-pointer"
                checked={check}
                onChange={toggleMode}
              />
              <label
                htmlFor="checkbox"
                className="cursor-pointer flex justify-between items-center w-14 h-7 rounded-full relative p-1 bg-gray-100 border"
              >
                <FaMoon color="f1c40f" />
                <FaSun color="f39c12" />
                <span
                  className={`bg-secondary opacity-40 absolute w-6 h-7 right-8 rounded-full transition-transform ${
                    !check ? "translate-x-8" : "translate-x-0"
                  }`}
                ></span>
              </label>
            </div>
            {user ? (
              <Avatar view="center" />
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-900 hover:text-gray-900 dark:text-dimWhite dark:hover:text-white duration-200"
                >
                  Login
                </Link>
                <Link to="/signup">
                  <button className={`${styles.button2}`}>Sign Up</button>
                </Link>
              </>
            )}
          </div>

          {user ? (
            <div
              className="text-3xl my-auto md:hidden"
              onClick={() => setOpen(!open)}
            >
              <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
            </div>
          ) : (
            <> </>
          )}
        </div>
        {!user ? (
          <> </>
        ) : (
          <ul className="md:flex hidden items-center font-medium h-[90px] z-50">
            <li>
              <Link
                to="/"
                className={`navLink ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`navLink ${
                  location.pathname === "/about" ? "active" : ""
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <NavLink
                onNavbarLinkClick={handleNavbarLinkClick}
                category="Movies"
              />
            </li>
            <li>
              <NavLink onNavbarLinkClick={handleNavbarLinkClick} category="TV" />
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
        )}
        {/* normal web view  */}

        <div className="md:flex hidden justify-center items-center gap-x-6 z-50">
          {/* Light/Dark mode switch */}
          <div className="relative">
            <input
              id="mobileCheckbox"
              type="checkbox"
              className="opacity-0 absolute flex justify-between items-center w-14 h-7 rounded-full z-10 p-1 cursor-pointer"
              checked={check}
              onChange={toggleMode}
            />
            <label
              htmlFor="mobileCheckbox"
              className="cursor-pointer flex justify-between items-center w-14 h-7 rounded-full relative p-1 bg-gray-100 border"
            >
              <FaMoon color="f1c40f" />
              <FaSun color="f39c12" />
              <span
                className={`bg-secondary opacity-40 absolute w-6 h-7 right-8 rounded-full transition-transform ${
                  !check ? "translate-x-8" : "translate-x-0"
                }`}
              ></span>
            </label>
          </div>
          {user ? (
            <Avatar view="end" />
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-900 hover:text-gray-900 dark:text-dimWhite dark:hover:text-white duration-200"
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
        {!user ? (
          <> </>
        ) : (
          <ul
            className={`md:hidden text-gray-900 dark:text-dimWhite bg-gray-300 dark:bg-secondary absolute w-full top-[90px] z-50 py-5 pl-4 duration-500  ${
              open ? "left-0" : "left-[-100%]"
            }`}
            style={{ zIndex: "1" }}
          >
            <li>
              <Link
                to="/"
                onClick={handleNavbarLinkClick}
                className={`navLink ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <NavLink
                onNavbarLinkClick={handleNavbarLinkClick}
                setDropdownOpen={setDropdownOpen}
                category="Movies"
              />{" "}
              {/* Pass the category prop */}
            </li>
            <li>
              <NavLink
                onNavbarLinkClick={handleNavbarLinkClick}
                setDropdownOpen={setDropdownOpen}
                category="TV"
              />{" "}
              {/* TV Shows dropdown */}
            </li>
            <li>
              <Link
                to="/recommend"
                onClick={handleNavbarLinkClick}
                className={`navLink ${
                  location.pathname === "/recommend" ? "active" : ""
                }`}
              >
                For You
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
