import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";

const legacy = ({ LegacyData, YoastData, hfdata }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTabLast, setSelectedTabLast] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const handleLastTabClick = (index) => {
    setSelectedTabLast(index);
  };

  const selectedContent =
    LegacyData.purple_overlay_section.tabs_main_section.tabs[selectedTab]
      .main_description;

  const selectedContentLast = LegacyData.tabs_last_section[selectedTabLast];

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const mainSection = document.querySelector(".About_banner");

    setTimeout(() => {
      mainSection.classList.add("scrolled");
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>
          {YoastData &&
          YoastData.yoast_head_json &&
          YoastData.yoast_head_json.title
            ? YoastData.yoast_head_json.title
            : "Legacy - Svarn"}
        </title>
        <>{parse(YoastData.yoast_head)}</>
        <link rel="icon" href="./Favicon.png" />
      </Head>
      <Navbar hfdata={hfdata} />
      {/* Banner */}
      <div className="About_banner w-full h-[600px] bg-themePurple flex justify-center items-center relative">
        {/* {LegacyData?.banner.background_video_url ? (
          <video
            className="w-full h-full object-cover absolute top-0 z-0 "
            muted
              autoPlay
              playsInline
              loop
            src={LegacyData?.banner.background_video_url}
          ></video>
        ) : (
          <img
            className="w-full h-full"
            src="/placeholder.png"
            alt="Placeholder"
          />
        )} */}
        {LegacyData?.banner.banner_image_url ? (
          <img
            className="w-full h-full object-cover absolute top-0 z-0 "
            src={LegacyData?.banner.banner_image_url}
          ></img>
        ) : (
          <img
            className="w-full h-full"
            src="/placeholder.png"
            alt="Placeholder"
          />
        )}
        <h1 className="text-white absolute z-[1] font-heading text-[50px] lg:text-[70px] xl:text-[100px] leading-[50px] lg:leading-[70px] xl:leading-[100px]">
          {LegacyData?.banner.main_heading}
        </h1>
      </div>

      {/* Approach Section */}
      <section className="w-full h-auto relative">
        {LegacyData?.purple_overlay_section.background_image_and_url ? (
          <img
            className="w-full h-[100%] object-cover absolute !z-[-1]"
            src={LegacyData?.purple_overlay_section.background_image_and_url}
            alt=""
          />
        ) : (
          <img className="w-full h-[200px]" src="/placeholder.png" alt="" />
        )}
        {/* Content */}
        <div className="w-full h-full Tabs_Bg static top-0 flex flex-col items-center py-12 px-3 md:px-0 md:pb-24">
          <h2 className="text-white font-body text-xl md:text-6xl font-light max-w-2xl md:max-w-3xl !text-center mt-6 md:mt-32 leading-[26px] md:leading-[57px] ">
            {LegacyData.purple_overlay_section.main_heading}
          </h2>
          <p className="text-white text-body !font-[300] max-w-3xl !text-center py-9 pt-[50px]  md:pt-[140px]">
            {LegacyData.purple_overlay_section.small_description}
          </p>
          {/* Tabs */}

          <h2 className="text-white text-xl md:text-3xl font-body font-normal leading-[1.5] md:leading-[38px] max-w-4xl !text-center !min-h-36 mt-22 md:mt-36 mb-10">
            {selectedContent}
          </h2>
          <div className="container">
            <div className="flex justify-between scroll-section w-[100%] md:w-auto gap-10 legecy_Tabs">
              {LegacyData.purple_overlay_section.tabs_main_section.tabs.map(
                (item, i) => (
                  <div
                    key={i}
                    className={`flex full Tabs_Box md:w-[28%] justify-center cursor-pointer pb-6 border-b-4  ${selectedTab === i ? "text-white" : "text-gray-400"} ${selectedTab === i ? "border-white" : "border-gray-400"}`}
                    onClick={() => handleTabClick(i)}
                  >
                    <div className="flex w-full flex-col items-center px-2 py-5 text-center">
                      <p
                        className={`font-body font-medium  mb-2 text-2xl ${selectedTab === i ? "text-themeMustard" : "text-[#bd902f98]"}`}
                      >
                        {item.tab_button_texts.heading}
                      </p>
                      <p className="font-body font-normal text-[16px]">
                        {item.tab_button_texts.sub_heading}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosphy */}
      <section className="w-full h-auto relative bg-themePurple flex flex-col items-center px-3 md:px-0 py-10 md:py-20">
        <h2 className="text-white font-body text-xl md:text-6xl font-light leading-[26px] md:leading-[57px] max-w-4xl !text-center mb-3 md:mb-10">
          {LegacyData.philosophy_section.main_heading}
        </h2>
        <p className="text-white text-body !font-[300] max-w-4xl !text-center ">
          {LegacyData.philosophy_section.description}
        </p>
      </section>

      {/* Values Section */}
      <section className="w-full bg-white py-10 md:py-20 overflow-hidden legacy_tabs">
        <div className="container flex flex-col-reverse md:flex-row">
          <div className="w-full md:w-1/2 text-themePurple pt-6 px-7 md:p-0">
            <h2 className="text-[20px] font-body font-normal leading-[26px] mb-3 md:mb-5">
              {selectedContentLast.sub_heading}
            </h2>
            <p className="text-xl md:text-[40px] font-body font-normal leading-[40px] text-themePurple">
              {selectedContentLast.tab_content}
            </p>
          </div>
          <div className="w-full md:w-1/2 ps-0 md:ps-10">
            <ul className="flex gap-8 md:gap-0 flex-row md:flex-col scroll-section">
              {LegacyData.tabs_last_section.map((item, i) => (
                <li
                  key={i}
                  className={`cursor-pointer  ${selectedTabLast === i ? "text-themePurple border-l-4 border-themePurple" : "text-[#2e0e1d7a] border-l-4 border-[#2e0e1d7a]"} text-xl md:text-[40px] font-heading font-normal leading-[75px] ps-7`}
                  onClick={() => handleLastTabClick(i)}
                >
                  {item.tab_button_text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer hfdata={hfdata} />
    </>
  );
};

export async function getStaticProps() {
  let LegacyData = {};
  // let Footer = {};
  let YoastData = {};
  let hfdata = {};

  try {
    const LegacyResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/pages/218`
    );
    LegacyData = LegacyResponse.data.acf;
    YoastData = LegacyResponse.data;

    // const FooterResponse = await axios.get(
    //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/pages/13`
    // );
    // Footer = FooterResponse.data.acf;
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
      LegacyData,
      YoastData,
      hfdata,
    },
    revalidate: 3600,
  };
}

export default legacy;
