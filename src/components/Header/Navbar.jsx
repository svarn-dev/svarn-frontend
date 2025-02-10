import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PiCirclesFourFill } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Navbar = ({ hfdata }) => {
  // console.log(hfdata, "Header");
  const [active, setActive] = useState(false);
  const currentRoute = usePathname();

  const toggle = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("logohidden");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("logohidden");
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("logohidden");
    };
  }, [active]);

  useEffect(() => {
    const stickywheel = () => {
      const nav = document.querySelector(".navigation_bar");
      if (window.scrollY > nav.offsetHeight) {
        nav.classList.add("fixed_nav");
      } else {
        nav.classList.remove("fixed_nav");
      }
    };

    window.addEventListener("scroll", stickywheel);

    return () => {
      window.removeEventListener("scroll", stickywheel);
    };
  }, []);

  return (
    // Main Section
    <div className="Main_Section relative header">
      <div className="fixed left-0 right-0 top-0 z-[999] navigation_bar">
        <div className="container">
          <div className="w-full h-[100px] flex justify-between items-center">
            {hfdata?.white_logo ? (
              <Link href="/" className="headerlogo">
                <img
                  className="w-[150px] animate"
                  src={hfdata?.white_logo}
                  alt="swarn"
                />
              </Link>
            ) : (
              <p></p>
            )}
            <div
              className=" relative z-50 w-[60px] h-[60px] cursor-pointer text-[#BD8F2F] bg-white rounded-[50%] flex justify-center items-center"
              onClick={toggle}
            >
              {active ? (
                <div className="w-[25px] h-[25px] relative cursor-pointer mx-auto transform rotate-0 animate">
                  <span className="block absolute w-[30px] h-[9px] bg-[#BD8F2F] opacity-[1] rounded-[15px] left-[-2px] top-[7px] transform rotate-45 animate"></span>
                  <span className="block absolute w-[30px] h-[9px] bg-[#BD8F2F] opacity-[1] rounded-[15px] left-[-2px] top-[7px] transform rotate-[-45deg] animate"></span>
                  <span className="block absolute w-[9px] h-[9px] bg-[#BD8F2F] opacity-[1] rounded-[50%] left-[65%] top-[15px] transform rotate-0 animate"></span>
                  <span className="block absolute w-[9px] h-[9px] bg-[#BD8F2F] opacity-[1] rounded-[50%] left-0 top-[15px] transform rotate-0 animate"></span>
                </div>
              ) : (
                <div className="w-[25px] h-[25px] relative cursor-pointer mx-auto transform rotate-0 animate">
                  <span className="block absolute w-[9px] h-[9px] bg-[#BD8F2F] opacity-[1] rounded-[50%] left-0 top-0 transform rotate-0 animate"></span>
                  <span className="block absolute w-[9px] h-[9px] bg-[#BD8F2F] opacity-[1] rounded-[50%] left-[65%] top-0 transform rotate-0 animate"></span>
                  <span className="block absolute w-[9px] h-[9px] bg-[#BD8F2F] opacity-[1] rounded-[50%] left-[65%] top-[15px] transform rotate-0 animate"></span>
                  <span className="block absolute w-[9px] h-[9px] bg-[#BD8F2F] opacity-[1] rounded-[50%] left-0 top-[15px] transform rotate-0 animate"></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Content Section */}
      <div
        className={`w-full h-screen bg-[#2e0e1d63] Main_Navigation fixed z-[99] left-0 animate ${active ? "top-[0%]" : "top-[100%]"} flex items-end  overflow-y-scroll`}
      >
        <div className="w-full bg-themePurple pt-16 pb-36 md:pb-9 inner_menu">
          <div className="container h-full svarnMobile">
            <div className="flex flex-wrap items-center Menu_items">
              {/* Left Side */}
              <div className="w-1/2 h-max hidden md:block content_block">
                {hfdata?.coloured_logo ? (
                  <img
                    className="w-[300px] mb-7"
                    src={hfdata?.coloured_logo}
                    alt="swarn"
                  />
                ) : (
                  <img src="./placeholder.png" alt="swarn" />
                )}
                <p className="text-white text-body !font-[300] mb-7">
                  {hfdata?.description}
                </p>
                <div className="flex">
                  <div className="mr-[80px]">
                    <h5 className="text-body text-white text-base !font-[300] mb-4">
                      {hfdata?.locations.location_title}
                    </h5>
                    <ul className="text-white">
                      {/* <li className="text-body text-white text-md !font-[400]">
                        {hfdata?.locations.address_one}
                      </li> */}

                      <Link
                        href={hfdata?.locations.location_url}
                        target="_blank"
                      >
                        <li className="text-body text-white text-md !font-[400]">
                          {hfdata?.locations.address_one}
                          {/* {hfdata?.locations.address_two}
                      {hfdata?.locations.address_city} */}
                        </li>
                      </Link>
                      {/* <li className="text-body text-white text-md !font-[400] my-2">
                        {hfdata?.locations.address_two}
                      </li>
                      <li className="text-body text-white text-md !font-[400]">
                        {hfdata?.locations.address_city}
                      </li> */}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-body text-white text-base !font-[300] mb-4">
                      {hfdata?.contact.contact_title}
                    </h5>
                    <ul className="text-white">
                      <li className="text-body text-white hover:underline text-xl !font-[400]">
                        <Link href={`mailto:${hfdata?.contact.contact_mail}`}>
                          {hfdata?.contact.contact_mail}
                        </Link>
                      </li>
                      <li className="text-body text-white hover:underline text-xl !font-[400]">
                        <Link href={`tel:${hfdata?.contact.contact_number}`}>
                          {hfdata?.contact.contact_number}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 h-max flex menu_list flex-col items-end">
                <Link
                  href="/"
                  className="text-heading text-themeMustard"
                  onClick={toggle}
                >
                  {hfdata?.menu.menu_content[0].menu_item}
                </Link>
                <Link
                  href="/about"
                  className="text-heading text-themeMustard"
                  onClick={toggle}
                >
                  {hfdata?.menu.menu_content[1].menu_item}
                </Link>
                <Link
                  href="/legacy"
                  className="text-heading text-themeMustard"
                  onClick={toggle}
                >
                  {hfdata?.menu.menu_content[2].menu_item}
                </Link>
                <Link
                  href="/portfolio/jumeirah-village-circle-dubai"
                  className="text-heading text-themeMustard"
                  onClick={toggle}
                >
                  {hfdata?.menu.menu_content[3].menu_item}
                </Link>
                <Link
                  href="/contact"
                  className="text-heading text-themeMustard"
                  onClick={toggle}
                >
                  {hfdata?.menu.menu_content[4].menu_item}
                </Link>
              </div>
              <div
                className="flex Bottom_bar w-full items-center justify-between"
                onClick={toggle}
              >
                <div className="hidden gap-7 md:flex">
                  <p className="text-white text-base">
                    {hfdata?.bottom_bar.terms_text}
                  </p>
                  <p className="text-white text-base">
                    {hfdata?.bottom_bar.privacy_text}
                  </p>
                </div>
                <div className="md:block hidden ">
                  <p className="text-white text-base">
                    {hfdata?.bottom_bar.copyright_text}
                  </p>
                </div>
                <div className="social_icons flex gap-4">
                  {hfdata?.social_icons.facebook_url && (
                    <Link
                      href={hfdata?.social_icons.facebook_url}
                      target="_blank"
                      className="text-[#BD8F2F] bg-themeMustard"
                    >
                      <FaFacebookF />
                    </Link>
                  )}

                  {hfdata?.social_icons.instagram_url && (
                    <Link
                      href={hfdata?.social_icons.instagram_url}
                      className="text-white"
                      target="_blank"
                    >
                      <FaInstagram />
                    </Link>
                  )}

                  {hfdata?.social_icons.linkedin_url && (
                    <Link
                      href={hfdata?.social_icons.linkedin_url}
                      className="text-white"
                      target="_blank"
                    >
                      <FaLinkedinIn />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
