import React, {useState, useEffect} from 'react'
import {FaArrowUp} from 'react-icons/fa'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const goTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    const listenToScroll = () => {
        let hiddenHeight = 600;
        const scroll =
        document.body.scrollTop || document.documentElement.scrollTop;
        if (scroll > hiddenHeight) {
        setIsVisible(true);
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
        {isVisible && (
            <div className="text-4xl fixed bottom-4 right-6 z-10 cursor-pointer text-white bg-gradient-to-r from-[#00264D] to-[#1357BD] p-4 rounded-full transition-all delay-300 ease-in-out hover:scale-110 animate-arrow-updown" onClick={goTop}>
            <FaArrowUp/>
            </div>
        )}
        </>
    )
}

export default ScrollToTop