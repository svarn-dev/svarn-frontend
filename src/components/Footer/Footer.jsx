import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const Footer = ({ hfdata }) => {
  // console.log(hfdata, "Footer");
  const currentRoute = usePathname();

  const [termspopup, setTermspopup] = useState(false);

  const openterms = () => {
    setTermspopup(true);
  };

  const closeterms = () => {
    setTermspopup(false);
  };

  const [policypopup, setPolicypopup] = useState(false);

  const openpolicy = () => {
    setPolicypopup(true);
  };

  const closepolicy = () => {
    setPolicypopup(false);
  };

  useEffect(() => {
    if (policypopup || termspopup) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup function to remove the class if the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [policypopup || termspopup]);

  const [formData, setFormData] = useState({
    Email: "",
    _wpcf7_unit_tag: "3c2359e",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/contact-form-7/v1/contact-forms/272/feedback`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("Email submitted successfully!");
        setFormData({
          Email: "",
          _wpcf7_unit_tag: "3c2359e",
        });
      } else {
        alert("Failed to submit the Email.");
      }
    } catch (error) {
      console.error("There was an error submitting the Email!", error);
      alert("Failed to submit the Email.");
    }
  };

  return (
    <>
      <div className="w-full bg-themePurple pt-16 pb-9 footer relative z-[3]">
        <div className="container h-full">
          <div className="flex flex-wrap items-center">
            {/* Left Side */}
            <div className="w-[70%] h-max Content_Section">
              <div className="Our_Newsletter">
                <p className="text-[20px] font-body font-normal leading-[26px] text-themeMustard">
                  {hfdata?.footer.subscribe_heading}
                </p>

                <form onSubmit={handleSubmit} className="Newsletter">
                  <input
                    className="text-body"
                    placeholder="Email Address"
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    required
                  />

                  <button type="submit" className="btn">
                    {hfdata?.footer.subscribe_btn}
                  </button>
                </form>

                {/* <div className="Newsletter">
                  <input
                    className="text-body"
                    type="text"
                    placeholder="Email Address"
                  />
                  <button className="btn">
                    {hfdata?.footer.subscribe_btn}
                  </button>
                </div> */}
                {hfdata?.coloured_logo ? (
                  <Link href="/">
                    <img
                      className="w-[300px] mb-7"
                      src={hfdata?.coloured_logo}
                      alt="swarn"
                    />
                  </Link>
                ) : (
                  <p></p>
                )}
                <p className="text-white text-body !font-[300] mb-7 max-w-[600px]">
                  {hfdata?.description}
                </p>
              </div>
              <div className="flex-wrap md:flex-nowrap flex items-center information_block">
                <div className="social_icons flex gap-4">
                  {hfdata?.social_icons.facebook_url && (
                    <Link
                      href={hfdata?.social_icons.facebook_url}
                      target="_blank"
                      className="text-black bg-themeMustard"
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
                <div className="mx-0 my-7 md:mr-[10px] md:ml-[50px]">
                  <h5 className="text-body text-[#ffffff70] text-base !font-[300] mb-2">
                    {hfdata?.locations.location_title}
                  </h5>
                  <ul className="text-white flex Info-Section gap-3">
                    <Link href={hfdata?.locations.location_url} target="_blank">
                    <li className="text-body text-white text-xl !font-[400]">
                      {hfdata?.locations.address_one}
                      {/* {hfdata?.locations.address_two}
                      {hfdata?.locations.address_city} */}
                    </li></Link>
                    {/* <li className="text-body text-white text-xl !font-[400]">
                      {hfdata?.locations.address_two}
                    </li>
                    <li className="text-body text-white text-xl !font-[400]">
                      {hfdata?.locations.address_city}
                    </li> */}
                  </ul>
                </div>
                <div>
                  <h5 className="text-body text-[#ffffff70] text-base !font-[300] mb-2">
                    {hfdata?.contact.contact_title}
                  </h5>
                  <ul className="text-white flex Info-Section gap-3">
                    <li className="text-body text-white hover:underline text-xl !font-[400] break-words">
                      <Link href={`mailto:${hfdata?.contact.contact_mail}`}>
                        {hfdata?.contact.contact_mail}
                      </Link>
                      <br />
                      <Link href={`tel:${hfdata?.contact.contact_number}`}>
                        {hfdata?.contact.contact_number}
                      </Link>
                    </li>
                    {/* <li className="text-body text-white text-xl hover:underline !font-[400]">
                      <Link href="#">{hfdata?.contact.contact_number}</Link>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-[30%] h-max flex menu_list flex-col items-end">
              <Link
                href="/"
                className={`text-heading ${"/" === currentRoute ? "text-[#bd902f7e]" : "text-themeMustard"} `}
              >
                {hfdata?.menu.menu_content[0].menu_item}
              </Link>
              <Link
                href="/about"
                className={`text-heading ${"/about" === currentRoute ? "text-[#bd902f7e]" : "text-themeMustard"}`}
              >
                {hfdata?.menu.menu_content[1].menu_item}
              </Link>
              <Link
                href="/legacy"
                className={`text-heading ${"/legacy" === currentRoute ? "text-[#bd902f7e]" : "text-themeMustard"}`}
              >
                {hfdata?.menu.menu_content[2].menu_item}
              </Link>
              <Link
                href="portfolio/jumeirah-village-circle-dubai"
                className={`text-heading ${"/portfolio" === currentRoute ? "text-[#bd902f7e]" : "text-themeMustard"}`}
              >
                {hfdata?.menu.menu_content[3].menu_item}
              </Link>
              <Link
                href="/contact"
                className={`text-heading ${"/contact" === currentRoute ? "text-[#bd902f7e]" : "text-themeMustard"}`}
              >
                {hfdata?.menu.menu_content[4].menu_item}
              </Link>
            </div>
            <div className="Bottom_bar w-full flex items-center gap-40">
              <div>
                <p className="text-white text-base font-body">
                  {hfdata?.bottom_bar.copyright_text}
                </p>
              </div>
              <div className="flex gap-7">
                <p
                  className="text-white text-base font-body cursor-pointer"
                  onClick={openterms}
                >
                  {hfdata?.bottom_bar.terms_text}
                </p>
                <p
                  className="text-white text-base font-body cursor-pointer"
                  onClick={openpolicy}
                >
                  {hfdata?.bottom_bar.privacy_text}
                </p>
              </div>
            </div>

            {termspopup && (
              <div className="fixed !z-50 !top-0 left-0 flex items-center justify-center w-full h-screen bg-[#000000ad] popup_block">
                <div className="w-[90%] md:w-[60%] h-[80%] bg-white px-5 py-5 md:px-16 md:py-16 overflow-y-scroll">
                  <div className="w-full full flex justify-between items-start py-5 overflow-y-scroll">
                    <div
                      className="w-max h-full overflow-y-scroll"
                      dangerouslySetInnerHTML={{
                        __html: hfdata?.bottom_bar.terms_popup,
                      }}
                    ></div>

                    <button
                      onClick={closeterms}
                      className="w-max h-max px-4 py-4 text-lg text-gray-600 hover:text-gray-900 border "
                    >
                      <RxCross2 />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {policypopup && (
              <div className="fixed !z-50 !top-0 left-0 flex items-center justify-center w-full h-screen bg-[#000000ad] popup_block">
                <div className="w-[90%] md:w-[60%] h-[80%] bg-white px-5 py-5 md:px-16 md:py-16 overflow-y-scroll">
                  <div className="w-full full flex justify-between items-start py-5 overflow-y-scroll">
                    <div
                      className="w-max h-full overflow-y-scroll"
                      dangerouslySetInnerHTML={{
                        __html: hfdata?.bottom_bar.privacy_popup,
                      }}
                    ></div>

                    <button
                      onClick={closepolicy}
                      className="w-max h-max px-4 py-4 text-lg text-gray-600 hover:text-gray-900 border "
                    >
                      <RxCross2 />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
