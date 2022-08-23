import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Links } from "./Links";

const NavLinks = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  return (
    <>
      {Links.map((link) => (
        <div>
          <div className="px-3 text-left md:cursor-pointer group">
            <h1
              className="py-7 flex justify-between items-center md:pr-0 pr-5 group"
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
                <ion-icon
                  name="chevron-down"
                ></ion-icon>
              </span>
            </h1>
            {link.subMenu && (
              <div>
                <div className="absolute top-20 hidden group-hover:md:block hover:md:block">
                  <div className="bg-secondary p-8 grid grid-cols-3 gap-10 rounded-lg">
                    {link.subLinks.map((mapSubLink) => (
                      <div>
                        <h1 className="text-lg font-medium text-white mb-3">
                          {mapSubLink.Head}
                        </h1>
                        {mapSubLink.subLink.map((sLink) => (
                          <li
                            key={sLink.name}
                            className="text-sm text-gray-300 font-light my-2.5"
                          >
                            <Link to={sLink.link} className="hover:text-white">
                              {sLink.name}
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Devices */}

          <div className={`${heading === link.name ? "md:hidden" : "hidden"}`}>
            {link.subLinks.map((sLink) => (
              <div className="">
                <div className="">
                  <h1
                    className="py-4 pl-7 font-medium flex justify-between items-center pr-5 md:pr-0"
                    onClick={() => {
                      subHeading !== sLink.Head
                        ? setSubHeading(sLink.Head)
                        : setSubHeading("");
                    }}
                  >
                    {sLink.Head}
                    <span className="text-xl md:mt-1 ml-2 inline">
                      <ion-icon
                        name={`${
                          subHeading === sLink.Head ? "chevron-up" : "chevron-down"
                        }`}
                      ></ion-icon>
                    </span>
                  </h1>
                  <div
                    className={`${
                      subHeading === sLink.Head ? "md:hidden" : "hidden"
                    }`}
                  >
                    {sLink.subLink.map((sLinks) => (
                      <li className="py-3 pl-14 font-light">
                        <Link to={sLinks.link}>{sLinks.name}</Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;
