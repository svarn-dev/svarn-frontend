import axios from "axios";
import React, { useEffect, useState } from "react";
import Team from "../components/Team/Team";
import Head from "next/head";
import parse from "html-react-parser";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import Link from "next/link";
import { TiSocialLinkedin } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const about = ({ AboutData, YoastData, hfdata }) => {
  // console.log(AboutData,"AboutData");

  const [isScrolled, setIsScrolled] = useState(false);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const isopenPop = () => {
    setIsPopupVisible(true);
  };

  const isclosePop = () => {
    setIsPopupVisible(false);
  };

  useEffect(() => {
    const mainSection = document.querySelector(".About_banner");

    setTimeout(() => {
      mainSection.classList.add("scrolled");
    }, 1500);
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPopup]);

  // // Brochure Form

  const [formData, setFormData] = useState({
    Email: "",
    PhoneNumber: "",
    Queries: "",
    _wpcf7_unit_tag: "9ae8578",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: !value,
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      PhoneNumber: value,
    });
    setErrors({
      ...errors,
      PhoneNumber: value.length <= 2,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      Email: !formData.Email,
      PhoneNumber: formData.PhoneNumber.length <= 2,
      // Queries: !formData.Queries,
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    // Perform form submission logic
    console.log("Form submitted", formData);

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
        alert("Form submitted successfully!");
        setFormData({
          Email: "",
          countrytext: "",
          PhoneNumber: "",
          Queries: "",
          _wpcf7_unit_tag: "9ae8578",
        });
        window.open(
          AboutData?.vision_and_mission_section.about_content
            .brochure_button_url
        );
      } else {
        alert("Failed to submit the form.");
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert("Failed to submit the form in the catch.");
    }
  };

  return (
    <>
      <Head>
      <meta name="robots" content="index, follow" />
        <title>
          {YoastData &&
          YoastData.yoast_head_json &&
          YoastData.yoast_head_json.title
            ? YoastData.yoast_head_json.title
            : "About - Svarn"}
        </title>
        <>{parse(YoastData.yoast_head)}</>
        <link rel="icon" href="./Favicon.png" />
      </Head>
      <Navbar hfdata={hfdata} />
      <div className="About_banner w-full h-[600px] bg-themePurple flex justify-center items-center relative">
        {/* {AboutData?.banner.background_video_url ? (
          <video
            muted
            autoPlay
            playsInline
            loop
            className="w-full h-full object-cover absolute top-0 z-0 "
            src={AboutData?.banner.background_video_url}
          ></video>
        ) : (
          <img src="./placeholder.png" className="w-full h-full" alt="" />
        )} */}
        {AboutData?.banner.banner_image_url ? (
          <img
            className="w-full h-full object-cover absolute top-0 z-0 "
            src={AboutData?.banner.banner_image_url}
          ></img>
        ) : (
          <img src="./placeholder.png" className="w-full h-full" alt="" />
        )}
        <h1 className="text-white absolute z-[1] font-heading text-[50px] lg:text-[70px] xl:text-[100px] leading-[50px] lg:leading-[70px] xl:leading-[100px]">
          {AboutData.banner.main_heading}
        </h1>
      </div>

      {/* Description Section */}
      <div className="w-full h-full bg-themePurple relative overflow-hidden pt-24 pb-16 md:pb-0 md:pt-32">
        <div className="container">
          <div className="flex relative flex-col-reverse gap-7 md:gap-0 md:flex-row">
            <div className="w-full md:w-1/2 h-full md:pb-32">
              <p className="font-body text-white text-[18px] lg:text-[30px] xl:text-[30px] leading-[1.5] lg:leading-[1.5] xl:leading-[1.5] 2xl:leading-[1.5] font-light">
                {AboutData.mr_ramesh_aswani_main_section.content.about_text}
              </p>
              <p className="font-body text-white text-[18px] lg:text-[30px] xl:text-[30px] leading-[1.5] lg:leading-[1.5] xl:leading-[1.5] 2xl:leading-[1.5] font-light my-4 md:my-6">
                {AboutData.mr_ramesh_aswani_main_section.content.about_text_two}
              </p>
              <h5 className="font-body text-white text-[20px] lg:text-[30px] xl:text-[36px] mb-4">
                {AboutData.mr_ramesh_aswani_main_section.content.name}
              </h5>
              <p className="font-body text-white text-[16px]  xl:text-[20px] uppercase tracking-[8px] font-[300]">
                {AboutData.mr_ramesh_aswani_main_section.content.designation}
              </p>
            </div>
            <div className="w-full md:w-1/2 h-full relative md:absolute right-0 mt-[-5%] md:mt-0 bottom-0 ">
              <img
                onClick={isopenPop}
                className="Solo_Member w-full h-full object-cover object-bottom cursor-pointer"
                src={AboutData?.mr_ramesh_aswani_main_section.image_url}
                alt="Picture"
              />
            </div>
            {isPopupVisible && (
              <div className="w-full h-[100vh] bg-themePurple fixed z-[10] top-[0%] left-0 modal flex justify-center items-center Team_Popup">
                <div className="inner_container w-[80%] mt-4 h-[80%] bg-themePurple flex justify-between items-center">
                  <div className="w-[60%] inner_section">
                    <p className="font-body text-white text-[24px] leading-[1.5] font-light mb-12">
                      {
                        AboutData?.team_members_section.members_column.member[0]
                          .popup_description.upper_description
                      }
                    </p>
                    <p className="font-body text-white text-[24px] leading-[1.5] font-light">
                      {
                        AboutData?.team_members_section.members_column.member[0]
                          .popup_description.lower_description
                      }
                    </p>
                    {/* <div className="flex justify-between items-center mt-24 flex-wrap">
                        <div className="">
                          <h2 className="font-body text-white text-[24px] md:text-[30px] mb-2">
                            {AboutData.mr_ramesh_aswani_main_section.content.name}
                          </h2>
                          <p className="font-body text-white text-[16px]  xl:text-[20px] uppercase tracking-[8px] font-[300]">
                            {AboutData.mr_ramesh_aswani_main_section.content.designation}
                          </p>
                        </div>
                        <Link className="social_icons popup_icon" href="/">
                          <TiSocialLinkedin />
                        </Link>
                      </div> */}
                  </div>
                  <div className="w-[30%] h-[600px] bg-[#200713] relative inner_section">
                    <button
                      className="border absolute right-5 top-5 w-[50px] h-[50px] text-white rounded-[50px] text-[26px] flex justify-center items-center"
                      onClick={isclosePop}
                    >
                      <RxCross2 />
                    </button>
                    {AboutData?.mr_ramesh_aswani_main_section.image_url ? (
                      <img
                        src={AboutData?.mr_ramesh_aswani_main_section.image_url}
                        className="w-full object-cover h-full"
                        alt=""
                      />
                    ) : (
                      <img
                        src="/placeholderimage.jpg"
                        className="w-[200px] h-[200px]"
                        alt="Image Placeholder"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Leadershid Sec */}
      <div className="w-full h-full bg-[#200713] text-white py-16 md:py-32">
        <div className="container flex flex-col gap-10 md:gap-0 md:flex-row justify-center items-center">
          <div className="w-full md:w-[33%] flex flex-col text-center justify-center items-center gap-5 lg:gap-10 xl:gap-[60px] pl-0 px-5 lg:pl-0 lg:px-[50px] xl:pl-0 xl:px-[100px]">
            <h2 className="text-[#BD8F2F] font-heading text-[25px] lg:text-[30px] xl:text-[40px]">
              {AboutData?.vision_and_mission_section.vision_column.heading}
            </h2>
            <p className="text-white text-body !font-[300]">
              {AboutData?.vision_and_mission_section.vision_column.description}
            </p>
          </div>
          <div className="w-full md:w-[33%] flex flex-col text-center justify-center items-center gap-5 lg:gap-10 xl:gap-[60px] py-10 md:py-0 px-5 lg:px-[50px] xl:px-[100px] border-t-2 border-b-2 md:border-t-0 md:border-b-0 border-l-0 border-r-0 md:border-l-2 md:border-r-2 border-[#BD8F2F]">
            <div className="mt-0 md:mt-[-30px] xl:mt-[-30px]">
              <h2 className="text-themeMustard text-2xl font-medium font-body">
                {
                  AboutData?.vision_and_mission_section.about_content
                    .sub_heading
                }
              </h2>
              {/* <p className="text-[14px] xl:text-[16px] leading-[14px] xl:leading-[16px] font-normal">
                {AboutData?.vision_and_mission_section.about_content.text_one}
              </p> */}
              <p className="text-themeMustard text-2xl font-medium font-body">
                {AboutData?.vision_and_mission_section.about_content.text_one}
              </p>
            </div>
            <div>
              <h2 className="text-themeMustard text-2xl font-medium font-body">
                {
                  AboutData?.vision_and_mission_section.about_content
                    .experienced_heading
                }
              </h2>
            </div>
            <div className="mb-0 md:mb-[-30px] xl:mb-[-30px]">
              <h2 className="text-themeMustard text-2xl font-medium font-body ">
                {
                  AboutData?.vision_and_mission_section.about_content
                    .projects_number_heading
                }
              </h2>
              <p className="text-[14px] xl:text-[16px] leading-[14px] xl:leading-[16px] font-normal">
                {AboutData?.vision_and_mission_section.about_content.text_three}
              </p>
            </div>
          </div>
          <div className="w-full md:w-[33%] flex flex-col text-center justify-center items-center gap-5 lg:gap-10 xl:gap-[60px] pr-0 px-5 lg:pr-0 lg:px-[50px] xl:pr-0 xl:px-[100px]">
            <h2 className="text-[#BD8F2F] font-heading text-[25px] lg:text-[30px] xl:text-[40px]">
              {AboutData?.vision_and_mission_section.mission_column.heading}
            </h2>
            <p className="text-white text-body !font-[300]">
              {AboutData?.vision_and_mission_section.mission_column.description}
            </p>
          </div>
        </div>
        {/* <Link href={AboutData?.vision_and_mission_section.about_content.brochure_button_url} target="_blank" className="btn !block w-[85%] md:w-[300px] text-center mx-auto mt-5 lg:mt-10 xl:mt-16">
          {AboutData?.vision_and_mission_section.about_content.brochure_button_text}
        </Link> */}
        <button
          className="btn !block w-[85%] md:w-[300px] text-center mx-auto mt-5 lg:mt-10 xl:mt-16"
          onClick={handleButtonClick}
        >
          {
            AboutData?.vision_and_mission_section.about_content
              .brochure_button_text
          }
        </button>

        {showPopup && (
          <div className="fixed !z-50 !top-0 left-0 flex bg-[#000000ad] items-center justify-center w-full h-screen popup_block px-5 xl:px-0 pb-0 xl:pb-10">
            <div className="relative max-w-[500px] w-full">
              <div className="bg-themePurple rounded-[50px] p-10 pt-[70px] mt-[120px] relative">
                <h3 className="text-[30px] text-white font-body capitalize font-medium">
                  Please fill the form
                </h3>
                <button
                  className="absolute text-[30px] right-[50px] top-[40px]"
                  onClick={handleClosePopup}
                >
                  <IoClose />
                </button>
                {/* Form */}
                <form onSubmit={handleSubmit} className="w-full mt-5 xl:mt-10">
                  <input
                    className="w-full text-[13px] lg:text-[16px] py-[10px] px-[15px] xl:px-6 xl:py-[17.5px] border-[2px] text-white border-[#BD8F2F] rounded-[40px] bg-[#BD8F2F14] mb-[15px] xl:mb-8 placeholder-[#BD8F2F]"
                    placeholder="Email"
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                  />
                  {errors.Email && (
                    <div
                      style={{
                        color: "red",
                        marginTop: "-10px",
                        marginBottom: "0px",
                      }}
                    >
                      Email is required
                    </div>
                  )}

                  <br />

                  <PhoneInput
                    country={"us"}
                    value={formData.PhoneNumber}
                    onChange={handlePhoneChange}
                    className="w-full PhoneNumberField border-[2px] border-[#BD8F2F] rounded-[40px] bg-[#BD8F2F14] mb-[10px]"
                    inputProps={{
                      name: "PhoneNumber",
                      autoFocus: true,
                      placeholder: "Phone",
                    }}
                  />
                  {errors.PhoneNumber && (
                    <div
                      style={{
                        color: "red",
                        marginTop: "-10px",
                        marginBottom: "0px",
                      }}
                    >
                      Phone number is required
                    </div>
                  )}

                  <br />

                  <textarea
                    className="w-full text-[13px] lg:text-[16px] py-[10px] px-[15px] text-white xl:px-6 xl:py-[17.5px] border-[2px] border-[#BD8F2F] rounded-[30px] lg:rounded-[40px] bg-[#BD8F2F14] mb-[15px] xl:mb-8 placeholder-[#BD8F2F]"
                    placeholder="Message"
                    rows={7}
                    name="Queries"
                    value={formData.Queries}
                    onChange={handleChange}
                  ></textarea>
                  {errors.Queries && (
                    <div
                      style={{
                        color: "red",
                        marginTop: "-10px",
                        marginBottom: "0px",
                      }}
                    >
                      Message is required
                    </div>
                  )}

                  <br />
                  <button
                    type="submit"
                    className="w-full text-[16px] lg:text-[24px] py-[10px] px-[15px] xl:px-6 border-[2px] border-[#BD8F2F] rounded-[40px] bg-[#BD8F2F] text-white hover:bg-transparent hover:text-[#BD8F2F] transition-all"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Team Section */}
      <section className="About_Team bg-white py-16 md:py-24 z-[3]">
        <div className="container">
          <div className="flex flex-wrap team_Section">
            <div className="w-[33%] full-section pr-9">
              <h2 className="text-4xl font-heading text-themePurple max-w-[200px] uppercase">
                {AboutData?.team_members_section.main_content.main_heading}
              </h2>
              <p className="text-xl text-themePurple font-body leading-6 mt-10">
                {AboutData?.team_members_section.main_content.description}
              </p>
            </div>
            <div className="w-[67%] full-section">
              <Team AboutData={AboutData} />
            </div>
          </div>
        </div>
      </section>
      <Footer hfdata={hfdata} />
    </>
  );
};

export async function getStaticProps() {
  let AboutData = {};
  let YoastData = {};
  let hfdata = {};

  try {
    const AboutResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/pages/170`
    );
    AboutData = AboutResponse.data.acf;
    YoastData = AboutResponse.data;
    const headerresponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/pages/13`
    );
    // console.log(headerresponse, "headerresponse");
    hfdata = headerresponse.data.acf;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return {
    props: {
      AboutData,
      YoastData,
      hfdata,
    },
    revalidate: 3600,
  };
}

export default about;
