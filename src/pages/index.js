import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { Navigation, A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Link from "next/link";
import { GoLinkExternal } from "react-icons/go";
import { FaAngleRight } from "react-icons/fa6";
import Head from "next/head";
import parse from "html-react-parser";
import Team from "../components/Team/Team";
import { IoClose } from "react-icons/io5";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
// import { Swiper, SwiperSlide  } from "swiper/react";
// Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
// import required modules
// import { Navigation, Pagination, autoplay } from "swiper/modules";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Index({
  HomeData,
  allPortfolio,
  allnewsdata,
  YoastData,
  AboutData,
  hfdata,
}) {
  // console.log(allPortfolio,"allPortfolio");
  // console.log(HomeData,"HomeData");

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleWheel = () => {
      const mainSectionHeight = document.querySelector(".Banner").offsetHeight;
      if (window.scrollY > 0) {
        setIsScrolled(true);
        document.body.classList.add("scrolled");
      } else {
        setIsScrolled(false);
        document.body.classList.remove("scrolled");
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const [scrollY, setScrollY] = useState(0);
  const [addScrolledClass, setAddScrolledClass] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setScrollY(window.scrollY);
        setIsScrolled(window.scrollY > 0);
      };

      window.addEventListener("scroll", handleScroll);

      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    let timer;
    if (scrollY > 0) {
      timer = setTimeout(() => {
        setAddScrolledClass(true);
      }, 500);
    } else {
      setAddScrolledClass(false);
    }

    return () => clearTimeout(timer);
  }, [scrollY]);

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

  // Brochure Form

  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    PhoneNumber: "",
    Agency: "",
    _wpcf7_unit_tag: "3a82546",
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
  
    // Validate all required fields
    const newErrors = {
      FullName: !formData.FullName,
      Email: !formData.Email,
      PhoneNumber: formData.PhoneNumber.length <= 2,
      Agency: !formData.Agency,
    };
  
    // If any validation errors exist, update the state and prevent submission
    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }
  
    // If no errors, proceed with form submission logic
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
          FullName: "",
          Email: "",
          PhoneNumber: "",
          Agency: "",
          _wpcf7_unit_tag: "3a82546",
        });
        window.open(HomeData.portfolio_section.broker_url);
      } else {
        alert("Failed to submit the form.");
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      // alert("Failed to submit the form in the catch.");
    }
  };

  return (
    <>
      <Head>
        <title>
          {YoastData &&
          YoastData.yoast_head_json &&
          YoastData.yoast_head_json.title
            ? YoastData.yoast_head_json.title
            : "Home - Svarn"}
        </title>
        <>{parse(YoastData.yoast_head)}</>
        <link rel="icon" href="./Favicon.png" />
      </Head>

      {/* Banner Section */}
      <Navbar hfdata={hfdata} />
      <section className="Banner w-full h-screen relative flex justify-center items-center">
        <div className="w-full hidden md:block h-full">
          {HomeData.banner.background_video_url ? (
            <video
              className="w-full h-full object-cover"
              muted
              autoPlay
              playsInline
              loop
              src={HomeData.banner.background_video_url}
            ></video>
          ) : (
            <img
              className="w-full h-full object-cover"
              src=""
              alt="placeholder"
            />
          )}
        </div>
        <div className="md:hidden h-full">
          {HomeData.banner.background_video_url ? (
            <video
              className="w-full h-full object-cover"
              muted
              autoPlay
              playsInline
              loop
              src={HomeData.banner.mobile_banner_url}
            ></video>
          ) : (
            <img
              className="w-full h-full object-cover"
              src=""
              alt="placeholder"
            />
          )}
        </div>
        <div className="max-w-[1000px] m-auto absolute text-[150px] leading-[160px]">
          {/* <h1 className="text-center font-heading text-white">
            {HomeData.banner.main_heading}
          </h1> */}
        </div>
      </section>

      {/* Overlay Section */}
      <section
        className={`w-full h-screen relative overlay_section animate ${scrollY > 0 ? "mt-[0vh]" : "mt-[100vh]"}  ${addScrolledClass ? "scrolled_class" : ""} `}
      >
        <div className="Overlay_text">
          <p className="text-white text-[20px] font-normal leading-[26px] max-w-[800px] m-auto text-center font-body">
            {HomeData.purple_overlay_section.main_description}
          </p>
          <img
            className="w-[150px] my-0 mx-auto mt-10"
            src={HomeData.purple_overlay_section.white_logo}
          />
        </div>
        <div className="relative video-Section h-full">
          {/* {HomeData.banner.background_video_url ? (
            <video
              className="w-full h-full object-cover absolute -z-[1] left-0 right-0 top-0 bottom-0"
              muted
              autoPlay
              playsInline
              loop
              src={HomeData.banner.background_video_url}
            ></video>
          ) : (
            <img
              className="w-full h-full object-cover"
              src=""
              alt="placeholder"
            />
          )} */}

          {HomeData.purple_overlay_section.background_image_url ? (
            <img
              className="w-full h-full object-cover absolute -z-[1] left-0 right-0 top-0 bottom-0"
              src={HomeData.purple_overlay_section.background_image_url}
            ></img>
          ) : (
            <img
              className="w-full h-full object-cover"
              src=""
              alt="placeholder"
            />
          )}

          <div className="spaceEnd">
            <p className="text-white text-[20px] font-normal leading-[26px] text-center font-body mb-5">
              {HomeData.purple_overlay_section.main_description}
            </p>

            <img
              className="w-[150px] Inner_logo"
              src={HomeData.purple_overlay_section.white_logo}
              alt="swarn"
            />
          </div>

          <p className="text-white text-body max-w-[800px] !my-0 m-auto text-center font-body">
            {HomeData.purple_overlay_section.small_description}
          </p>
          <p className="text-white text-body max-w-[800px] !my-0 m-auto text-center font-body !mt-5">
            {HomeData.purple_overlay_section.description}
          </p>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="w-full h-max bg-[#200713] py-24 z-[3] relative">
        <div className="container">
          <div className="flex gap-8 md:gap-y-8 md:gap-x-0 flex-wrap leadership justify-between text-center">
            {HomeData.leadership_section.heading_and_text.map((item, i) => {
              return (
                <ul className="w-full md:w-1/2 lg:w-1/4" key={i}>
                  {item.heading && (
                    <li className="text-themeMustard text-2xl font-medium  font-body">
                      {item.heading}
                    </li>
                  )}
                  {item.text && (
                    // <li className="text-white text-base font-body mt-3">
                    //   {item.text}
                    // </li>
                    <li className="text-themeMustard text-2xl font-medium font-body">
                      {item.text}
                    </li>
                  )}
                </ul>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <div
        className="Home_Portfolio w-full bg-themePurple Z-[3] relative py-11 pb-16"
        ref={sectionRef}
      >
        <div className="container text-center">
          <h2 className="text-4xl font-heading text-themeMustard mb-10">
            {HomeData.portfolio_section.main_heading}
          </h2>
        </div>
        <Swiper
          className="mySwiper"
          modules={[Navigation, A11y, Pagination]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          slidesPerView={1}
          loop={true}
        >
          {allPortfolio.map((slide, index) => (
            <SwiperSlide key={index}>
              {slide.acf.portfolio_content.main_video_url ? (
                <video
                  src={slide.acf.portfolio_content.main_video_url}
                  muted
                  autoPlay
                  playsInline
                  loop
                  className="w-full h-[650px] object-cover"
                ></video>
              ) : (
                <img
                  className="w-full h-full"
                  src="/placeholderimage.jpg"
                  alt="Image Placeholder"
                />
              )}
              <div className="container relative">
                <Link
                  className="text-center portfolio_Button flex gap-5 justify-center items-center font-heading text-white text-[55px] md:text-[75px] xl:text-[80px]"
                  href={`/portfolio/${slide.slug}`}
                >
                  {slide.acf.portfolio_content.button_text}
                  <div className="Arrow_Icon">
                    <FaAngleRight />
                  </div>
                </Link>
                <h6 className="font-body uppercase text-white font-medium text-xl mt-5 text-center">
                  {slide.acf.portfolio_content.main_title}
                </h6>
                <p className="font-body text-white text-body !font-[300] text-center">
                  {slide.acf.portfolio_content.description}
                </p>

                <button
                  className="btn !block w-full md:w-[250px] text-center mx-auto mt-5"
                  target="_blank"
                  onClick={handleButtonClick}
                >
                  {slide.acf.portfolio_content.brochure_button_text}
                </button>

                {/* <Link
                  href={slide.acf.portfolio_content.brochure_button_url}
                  target="_blank"
                  className="btn !block w-full md:w-[250px] text-center mx-auto mt-5"
                >
                  {slide.acf.portfolio_content.brochure_button_text}
                </Link> */}

                {/* <Link
                  className="text-center portfolio_Button flex gap-5 justify-center items-center font-heading text-white text-[55px] md:text-[75px] xl:text-[80px]"
                  href={`/portfolio/${slide.slug}`}
                >
                  {slide.acf.portfolio_content.button_text}
                  <div className="Arrow_Icon">
                    <FaAngleRight />
                  </div>
                </Link> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* <div className="custom-navigation-wrapper absolute max-w-[1400px] px-4 py-0 left-0 bottom-[30%] md:bottom-[150px] 2xl:bottom-[110px] right-5 2xl:-right-[140px] m-auto">
          <div className="custom-prev swiper-button-prev !right-[80px] md:!right-0"></div>
          <div className="custom-next swiper-button-next !top-0 md:!top-[-80px]"></div>
        </div> */}
      </div>

      {/* Team Section */}
      <div className="bg-white">
        <section className="bg-white py-24 z-[3] relative">
          <div className="container">
            <div className="flex flex-wrap team_Section">
              <div className="w-[33%] full-section pr-10">
                <h2 className="text-4xl font-heading text-themePurple max-w-[200px]">
                  {HomeData.team_leadership_section.main_heading}
                </h2>
                <p className="text-body text-themePurple font-body leading-6 mt-10">
                  {HomeData.team_leadership_section.main_description}
                </p>
              </div>
              <div className="Home_Team w-[67%] full-section flex flex-wrap gap-11">
                <Team AboutData={AboutData} />
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <div className="bg-themePurple z-[1] relative">
          <section className="News_Section w-full bg-white pb-36">
            <div className="container">
              <h2 className="text-4xl font-heading text-themePurple text-center mb-12">
                {HomeData.news_section.main_heading}
              </h2>
              <div className="flex justify-between News_Scroll relative">
                <Swiper
                  slidesPerView={3}
                  spaceBetween={30}
                  loop={true}
                  autoplay={true}
                  modules={[Navigation, Pagination]}
                  navigation={{
                    prevEl: ".custom-prev",
                    nextEl: ".custom-next",
                  }}
                  // pagination={{
                  //   clickable: true,
                  // }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    440: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    480: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    520: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                  }}
                  className="mySwiper"
                >
                  {allnewsdata.map((item, i) => {
                    return (
                      <>
                        <SwiperSlide>
                          <div className="News relative rounded-[30px] overflow-hidden w-full">
                            <Link
                              className=""
                              href={item.acf.news_cpt_content.news_url}
                              target="_blank"
                            >
                              {/* <Link href={`/news/${item.slug}`}></Link> */}
                              {item.acf.news_cpt_content.background_image ? (
                                <img
                                  className="w-full h-full absolute top-0 left-0 right-0 bottom-0 -z-10"
                                  src={
                                    item.acf.news_cpt_content.background_image
                                  }
                                  alt=""
                                />
                              ) : (
                                <img src="/placeholder.png" alt="" />
                              )}
                              <div className="relative py-7 px-5 h-full flex flex-col justify-between z-[3] min-h-[280px]">
                                <h6 className="text-white text-xl font-body">
                                  {item.acf.news_cpt_content.main_title}
                                </h6>
                                <div className="flex justify-between">
                                  <div>
                                    <p className="text-white text-base font-body font-medium">
                                      {item.acf.news_cpt_content.category}
                                    </p>
                                    <p className="text-white text-sm font-body mt-1">
                                      {item.acf.news_cpt_content.author}
                                    </p>
                                  </div>
                                  <div>
                                    <div className="Url_icon">
                                      <GoLinkExternal />
                                    </div>
                                    <p className="text-white text-base font-body mt-1">
                                      {item.acf.news_cpt_content.date}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </SwiperSlide>
                      </>
                    );
                  })}
                </Swiper>

                <div className="custom-navigation-wrapper flex gap-5 justify-center w-full absolute -bottom-[90px] Home_Swiper_Navigation">
                  <div className="custom-prev !static swiper-button-prev cursor-pointer !w-[60px] !h-[60px] p-3 flex justify-center bg-themePurple hover:bg-transparent items-center border transition-all border-black rounded-full">
                    <FaAngleLeft />
                  </div>
                  <div className="custom-next !static swiper-button-next cursor-pointer !w-[60px] !h-[60px] p-3 flex justify-center bg-themePurple hover:bg-transparent items-center transition-all border border-black rounded-full">
                    <FaAngleRight />
                  </div>
                </div>
              </div>

              {/*  */}

              {/* <div className="flex justify-between News_Scroll">
                {allnewsdata.map((item, i) => {
                  return (
                    <>
                      <div className="News relative rounded-[30px] overflow-hidden">
                        <Link
                          href={item.acf.news_cpt_content.news_url}
                          target="_blank"
                        >
                          {item.acf.news_cpt_content.background_image ? (
                            <img
                              className="w-full h-full"
                              src={item.acf.news_cpt_content.background_image}
                              alt=""
                            />
                          ) : (
                            <img src="/placeholder.png" alt="" />
                          )}
                          <div className="absolute py-7 px-5 top-0 h-full flex flex-col justify-between z-[3]">
                            <h6 className="text-white text-xl font-body">
                              {item.acf.news_cpt_content.main_title}
                            </h6>
                            <div className="flex justify-between">
                              <div>
                                <p className="text-white text-base font-body font-medium">
                                  {item.acf.news_cpt_content.category}
                                </p>
                                <p className="text-white text-sm font-body mt-1">
                                  {item.acf.news_cpt_content.author}
                                </p>
                              </div>
                              <div>
                                <div className="Url_icon">
                                  <GoLinkExternal />
                                </div>
                                <p className="text-white text-base font-body mt-1">
                                  {item.acf.news_cpt_content.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </>
                  );
                })}
              </div> */}
            </div>
          </section>
        </div>
      </div>
      <Footer hfdata={hfdata} />

      {/* Popup */}

      {showPopup && (
        // <div className="fixed !z-50 !top-0 left-0 flex bg-[#000000ad] items-center justify-center w-full h-screen popup_block px-5 xl:px-0 pb-0 xl:pb-10">
        //   <div className="relative max-w-[500px] w-full">
        //     <div className="bg-themePurple rounded-[50px] p-10 pt-[70px] mt-[120px] relative">
        //       <h3 className="text-[30px] text-white font-body capitalize font-medium">
        //         Please fill the form
        //       </h3>
        //       <button
        //         className="absolute text-[30px] right-[50px] top-[40px] text-white"
        //         onClick={handleClosePopup}
        //       >
        //         <IoClose />
        //       </button>

        //       <form onSubmit={handleSubmit} className="w-full mt-5 xl:mt-10">
        //       <input
        //           className="w-full text-[13px] lg:text-[16px] py-[10px] px-[15px] xl:px-6 xl:py-[17.5px] border-[2px] text-white border-[#BD8F2F] rounded-[40px] bg-[#BD8F2F14] mb-[15px] xl:mb-8 placeholder-[#BD8F2F]"
        //           placeholder="Full Name"
        //           type="text"
        //           name="FullName"
        //           value={formData.FullName}
        //           onChange={handleChange}
        //         />
        //         {errors.FullName && (
        //           <div
        //             style={{
        //               color: "red",
        //               marginTop: "-10px",
        //               marginBottom: "0px",
        //             }}
        //           >
        //             FullName is required
        //           </div>
        //         )}
        //         <br />
        //         <input
        //           className="w-full text-[13px] lg:text-[16px] py-[10px] px-[15px] xl:px-6 xl:py-[17.5px] border-[2px] text-white border-[#BD8F2F] rounded-[40px] bg-[#BD8F2F14] mb-[15px] xl:mb-8 placeholder-[#BD8F2F]"
        //           placeholder="Email"
        //           type="email"
        //           name="Email"
        //           value={formData.Email}
        //           onChange={handleChange}
        //         />
        //         {errors.Email && (
        //           <div
        //             style={{
        //               color: "red",
        //               marginTop: "-10px",
        //               marginBottom: "0px",
        //             }}
        //           >
        //             Email is required
        //           </div>
        //         )}

        //         <br />

        //         <PhoneInput
        //           country={"us"}
        //           value={formData.PhoneNumber}
        //           onChange={handlePhoneChange}
        //           className="w-full PhoneNumberField border-[2px] border-[#BD8F2F] rounded-[40px] bg-[#BD8F2F14] mb-[10px]"
        //           inputProps={{
        //             name: "PhoneNumber",
        //             autoFocus: true,
        //             placeholder: "Phone",
        //           }}
        //         />
        //         {errors.PhoneNumber && (
        //           <div
        //             style={{
        //               color: "red",
        //               marginTop: "-10px",
        //               marginBottom: "0px",
        //             }}
        //           >
        //             Phone number is required
        //           </div>
        //         )}

        //         <br />

        //         <input
        //           className="w-full text-[13px] lg:text-[16px] py-[10px] px-[15px] text-white xl:px-6 xl:py-[17.5px] border-[2px] border-[#BD8F2F] rounded-[30px] lg:rounded-[40px] bg-[#BD8F2F14] mb-[15px] xl:mb-8 placeholder-[#BD8F2F]"
        //           placeholder="Agency Name"                  
        //           name="Agency"
        //           value={formData.Agency}
        //           onChange={handleChange}
        //         ></input>
        //         {errors.Agency && (
        //           <div
        //             style={{
        //               color: "red",
        //               marginTop: "-10px",
        //               marginBottom: "0px",
        //             }}
        //           >
        //             Message is required
        //           </div>
        //         )}

        //         <br />
        //         <button
        //           type="submit"
        //           className="w-full text-[16px] lg:text-[24px] py-[10px] px-[15px] xl:px-6 border-[2px] border-[#BD8F2F] rounded-[40px] bg-[#BD8F2F] text-white hover:bg-transparent hover:text-[#BD8F2F] transition-all"
        //         >
        //           Submit
        //         </button>
        //       </form>
        //     </div>
        //   </div>
        // </div>
        <div className="fixed !z-[9999] !top-0 left-0 flex bg-[#000000ad] items-center justify-center w-full h-screen popup_block px-5 xl:px-0 pb-0 xl:pb-10">
        <div className="relative max-w-[500px] w-full">
          <div className="bg-themePurple rounded-[50px] p-10 pt-[70px] relative">
            <h3 className="text-[30px] text-white font-body capitalize font-medium">
              Please fill the form
            </h3>
            <button
              className="absolute text-[30px] right-[50px] top-[40px] text-white"
              onClick={handleClosePopup}
            >
              <IoClose />
            </button>
            {/* Form */}
            <form onSubmit={handleSubmit} className='w-full mt-5 xl:mt-10'>
                <input
                  className='w-full text-[13px] lg:text-[16px] py-[10px] px-[15px] xl:px-6 xl:py-[17.5px] border-[2px] text-white border-[#BD8F2F] rounded-[40px] bg-[#BD8F2F14] placeholder-[#BD8F2F]'
                  placeholder='Full Name'
                  type='text'
                  name='FullName'
                  value={formData.FullName}
                  onChange={handleChange}
                />
                <br />
                {errors.FullName && (
                  <div
                    style={{
                      color: 'red',
                      marginTop: '0px',
                      marginBottom: '0px'
                    }}
                  >
                    FullName is required
                  </div>
                )}

                <br />

                <input
                  className='w-full text-[13px] lg:text-[16px] py-[10px] px-[15px] xl:px-6 xl:py-[17.5px] border-[2px] text-white border-[#BD8F2F] rounded-[40px] bg-[#BD8F2F14] placeholder-[#BD8F2F]'
                  placeholder='Email'
                  type='email'
                  name='Email'
                  value={formData.Email}
                  onChange={handleChange}
                />
                <br />
                {errors.Email && (
                  <div
                    style={{
                      color: 'red',
                      marginBottom: '0px'
                    }}
                  >
                    Email is required
                  </div>
                )}

                <br />

                <PhoneInput
                  country={'ae'}
                  value={formData.PhoneNumber}
                  onChange={handlePhoneChange}
                  className='w-full PhoneNumberField border-[2px] border-[#BD8F2F] rounded-[40px] bg-[#BD8F2F14]'
                  inputProps={{
                    name: 'PhoneNumber',
                    autoFocus: true,
                    placeholder: 'Phone'
                  }}
                />
                {errors.PhoneNumber && (
                  <div
                    style={{
                      color: 'red',
                      marginBottom: '0px'
                    }}
                  >
                    PhoneNumber is required
                  </div>
                )}
                <br />
                <input
                  className='w-full text-[13px] lg:text-[16px] py-[10px] px-[15px] text-white xl:px-6 xl:py-[17.5px] border-[2px] border-[#BD8F2F] rounded-[30px] lg:rounded-[40px] bg-[#BD8F2F14] placeholder-[#BD8F2F]'
                  placeholder='Agency Name'
                  name='Agency'
                  value={formData.Agency}
                  onChange={handleChange}
                ></input>
                <br />
                {errors.Agency && (
                  <div
                    style={{
                      color: 'red',
                      marginBottom: '0px'
                    }}
                  >
                    Agency Name is required
                  </div>
                )}

                <br />
                <button
                  type='submit'
                  className='w-full text-[16px] lg:text-[24px] py-[10px] px-[15px] xl:px-6 border-[2px] border-[#BD8F2F] rounded-[40px] bg-[#BD8F2F] text-white hover:bg-transparent hover:text-[#BD8F2F] transition-all'
                >
                  Submit
                </button>
              </form>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

export async function getStaticProps() {
  let HomeData = {};
  let portfolioData = {};
  let allPortfolio = [];
  let newsData = {};
  let allnewsdata = [];
  let YoastData = {};
  let AboutData = {};
  let hfdata = {};

  try {
    const homeResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/pages/37`
    );
    HomeData = homeResponse.data.acf;
    YoastData = homeResponse.data;

    const portfolioResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/pages/136`
    );
    portfolioData = portfolioResponse.data.acf;

    const allportfolio = portfolioResponse.data.acf.portfolios || [];
    const portfolioIdsToFetch = allportfolio.join(",");
    const Data = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/portfolio?include=${portfolioIdsToFetch}`
    );
    allPortfolio = Data.data;

    const newsResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/pages/301`
    );
    newsData = newsResponse.data.acf;

    const allnews = newsResponse.data.acf.news || [];
    const newsIdsToFetch = allnews.join(",");
    const allData = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/news?include=${newsIdsToFetch}`
    );
    allnewsdata = allData.data;

    const AboutResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/pages/170`
    );
    AboutData = AboutResponse.data.acf;

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
      HomeData,
      allPortfolio,
      allnewsdata,
      YoastData,
      AboutData,
      hfdata,
    },
    revalidate: 3600,
  };
}

// import { Swiper, SwiperSlide  } from "swiper/react";
// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import { FaAngleRight } from "react-icons/fa6";
// import { FaAngleLeft } from "react-icons/fa6";
// // import required modules
// import { Navigation, Pagination, autoplay } from "swiper/modules";
// const SwiperCarousel = () => {
//   return (
//     <div>
//       <>
//         <div className="Custom_Slider" id="Custom_Slider">
//           <h1 className="text-[50px] font-bold text-font mb-3">
//             Swiper Slider
//           </h1>
//           <div className="relative">
//             <Swiper
//               slidesPerView={3}
//               spaceBetween={30}
//               loop={true}
//               autoplay={true}
//               modules={[Navigation, Pagination]}
//               navigation={{
//                 prevEl: ".custom-prev",
//                 nextEl: ".custom-next",
//               }}
//               pagination={{
//                 clickable: true,
//               }}
//               breakpoints={{
//                 320: {
//                   slidesPerView: 1,
//                   spaceBetween: 10,
//                 },
//                 480: {
//                   slidesPerView: 2,
//                   spaceBetween: 20,
//                 },
//                 768: {
//                   slidesPerView: 3,
//                   spaceBetween: 30,
//                 },
//               }}
//               className="mySwiper"
//             >
//               <SwiperSlide>
//                 <img className="w-full h-full" src="/Slide1.png" />
//               </SwiperSlide>
//             </Swiper>
//             <div className="custom-navigation-wrapper flex gap-5 static mt-5 md:mt-0 md:absolute right-0 -top-[80px]">
//               <div className="custom-prev swiper-button-prev cursor-pointer w-[60px] h-[60px] flex justify-center items-center text-white bg-black hover:bg-white hover:text-black transition-all border border-black rounded-full text-[20px]">
//                 <FaAngleLeft />
//               </div>
//               <div className="custom-next swiper-button-next cursor-pointer w-[60px] h-[60px] flex justify-center items-center text-white bg-black hover:bg-white hover:text-black transition-all border border-black rounded-full text-[20px]">
//                 <FaAngleRight />
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     </div>
//   );
// };
// export default SwiperCarousel;
