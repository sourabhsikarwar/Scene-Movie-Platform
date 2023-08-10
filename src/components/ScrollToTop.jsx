import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  //check line 18 for explanation
  const [isBottom, setIsBottom] = useState(false);
  const goTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    let hiddenHeight = 100;
    const scroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (scroll > hiddenHeight) {
      setIsVisible(true);
      //when we react bottom of the page ,
      //  in some mobile version we unable to see content behind to scrolltotop icon so we add some bottom px
      if (
        window.innerHeight + window.pageYOffset + 50 >=
        document.body.scrollHeight
      )
        setIsBottom(true);
      else setIsBottom(false);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => {
      window.removeEventListener("scroll", listenToScroll);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className={`  fixed p-2 bg-gradient-to-r from-[#00264D] to-[#1357BD] bg-opacity-100 shadow-lg rounded-full z-20 ${
          isVisible ? (isBottom ? "bottom-32 right-10" : "hidden") : "hidden"
        } hover:from-indigo-500
      hover:via-purple-700
      hover:bg-gradient-to-r`}
        onClick={goTop}
      >
        <FaArrowUp size={25} color="white" />
      </button>
    </>
  );
};

export default ScrollToTop;
