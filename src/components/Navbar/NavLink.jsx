import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Links } from "./Links";
import axios from "axios";

const NavLinks = () => {
  const apiKey = process.env.REACT_APP_API_KEY
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const location = useLocation();


  const [movie, setMovie] = useState("");

  const isMounted = useRef(true);

  const upload = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
      )
      .then((res) => {
        setMovie(res.data.results);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(function () {
    if (isMounted.current) {
      upload();
    }
    return () => {
      isMounted.current = false;
    };
  });

  return (
    <>
      {Links.map((link) => (
        <div key={link.id}>
          <div className="mx-3 text-left md:cursor-pointer group">
            <h1
              className={`${location.pathname.startsWith('/category/movie') ? 'active' : ''} my-7 flex navDropdown justify-between mx-2 md:ml-0 items-center md:mr-0 mr-5 group`}
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
              }}
            >
              {link.name}
              <span className="text-xl md:mt-1 ml-2 inline md:hidden">
                <ion-icon
                  name={`${
                    heading === link.name ? "chevron-up" : "chevron-down"
                  }`}
                ></ion-icon>
              </span>
              <span className="text-xl md:mt-1 ml-2 md:block hidden group-hover:rotate-180 group-hover:-mt-2 duration-300">
                <ion-icon name="chevron-down"></ion-icon>
              </span>
            </h1>
            {link.subMenu && (
              <div>
                <div className="absolute top-[60px] hidden group-hover:md:block hover:md:block z-50">
                  <div className="bg-secondary p-8 grid grid-cols-3 gap-x-10 rounded-lg">
                    {link.genres.map((sLink) => (
                      <li
                        key={sLink.id}
                        className="text-sm text-gray-300 font-light my-2.5"
                      >
                        <Link
                          to={
                            link.name === "Movies"
                              ? `/category/movie/${sLink.name}/${sLink.id}`
                              : `/category/movie/${sLink.name}/${sLink.id}`
                          }
                          className="hover:text-white"
                        >
                          {sLink.name}
                        </Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Devices */}

          <div className={`navDropdown ${heading === link.name ? "md:hidden" : "hidden"}`}>
            <div className="grid grid-cols-2">
              {link.genres.map((sLinks) => (
                <li className="py-3 pl-7 font-light" key={sLinks.id}>
                  <Link to={sLinks.id}>{sLinks.name}</Link>
                </li>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;
