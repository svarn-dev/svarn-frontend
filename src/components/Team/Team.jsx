import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { TiSocialLinkedin } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

const Team = ({ AboutData }) => {
  const [openModalIndex, setOpenModalIndex] = useState(null);

  const openModal = (index) => {
    setOpenModalIndex(index);
  };

  const closeModal = () => {
    setOpenModalIndex(null);
  };

  useEffect(() => {
    if (openModalIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModalIndex]);

  return (
    <div className="w-full h-full flex flex-wrap gap-11 scroll-section">
      {/* <Swiper
        slidesPerView={3}
        spaceBetween={30}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        className="mySwiper"
      >
        {AboutData?.team_members_section.members_column.member.map(
          (member, index) => (
            <SwiperSlide>
              <div className="card" key={index}>
                <div>
                  <h4 className="font-heading text-themePurple text-lg">
                    {member.name}
                  </h4>
                  <h6 className="font-body text-themePurple text-sm mt-1 font-medium">
                    {member.designation}
                  </h6>
                  <p className="font-body text-themePurple text-sm font-normal mt-4 !min-h-[40px] xl:!min-h-[60px]">
                    {member.about_description}
                  </p>
                  <button
                    className="ReadMore font-body text-themeMustard text-sm font-normal flex items-center gap-3"
                    onClick={() => openModal(index)}
                  >
                    {member.button_text} <IoIosArrowDropright />
                  </button>
                </div>
                {member.image_url ? (
                  <img
                    src={member.image_url}
                    className="team_member w-full"
                    alt={member.name}
                  />
                ) : (
                  <img
                    src="/placeholderimage.jpg"
                    className="team_member w-full"
                    alt="Image Placeholder"
                  />
                )}
                {openModalIndex === index && (
                  <div className="w-full h-[100vh] bg-themePurple fixed z-[10] top-[0%] left-0 modal flex justify-center items-center Team_Popup ">
                    <div className="inner_container w-[80%] mt-4 h-[80%] bg-themePurple flex justify-between items-start container pt-[4%]">
                      <div className="w-[65%] inner_section">
                        <p className="text-white text-body !font-[300] font-light mb-12">
                          {member.popup_description.upper_description}
                        </p>
                        <p className="text-white text-body !font-[300] font-light">
                          {member.popup_description.lower_description}
                        </p>
                        <div className="flex justify-between items-center mt-24 flex-wrap">
                          <div className="">
                            <h2 className="font-body text-white text-[24px] md:text-[30px] mb-2">
                              {member.name}
                            </h2>
                            <p className="font-body text-white text-[16px]  xl:text-[20px] uppercase tracking-[8px] font-[300]">
                              {member.designation}
                            </p>
                          </div>
                          <Link className="social_icons popup_icon" href="/">
                            <TiSocialLinkedin />
                          </Link>
                        </div>
                      </div>
                      <div className="w-max h-[600px] bg-[#200713] relative inner_section ">
                        <button
                          className="border absolute right-5 top-5 w-[50px] h-[50px] text-white rounded-[50px] text-[26px] flex justify-center items-center"
                          onClick={() => closeModal(index)}
                        >
                          <RxCross2 />
                        </button>
                        {member.image_url ? (
                          <img
                            src={member.image_url}
                            className="w-full object-contain h-[600px]"
                            alt={member.name}
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
            </SwiperSlide>
          )
        )}
      </Swiper> */}
      {AboutData?.team_members_section.members_column.member.map(
        (member, index) => (
          <div className="card" key={index}>
            <div>
              <h4 className="font-heading text-themePurple text-lg">
                {member.name}
              </h4>
              <h6 className="font-body text-themePurple text-sm mt-1 font-medium">
                {member.designation}
              </h6>
              <p className="font-body text-themePurple text-sm font-normal mt-4 !min-h-[60px] xl:!min-h-[70px]">
                {member.about_description}
              </p>
              <button
                className="ReadMore font-body text-themeMustard text-sm font-normal flex items-center gap-3"
                onClick={() => openModal(index)}
              >
                {member.button_text} <IoIosArrowDropright />
              </button>
            </div>
            {member.image_url ? (
              <img
                src={member.image_url}
                className="team_member w-full"
                alt={member.name}
              />
            ) : (
              <img
                src="/placeholderimage.jpg"
                className="team_member w-full"
                alt="Image Placeholder"
              />
            )}
            {openModalIndex === index && (
              <div className="w-full h-[100vh] bg-themePurple fixed z-[10] top-[0%] left-0 modal flex justify-center items-center Team_Popup ">
                <div className="inner_container w-[80%] mt-4 h-[80%] bg-themePurple flex justify-between items-start container pt-[4%]">
                  <div className="w-[65%] inner_section">
                    <p className="text-white text-body !font-[300] mb-12">
                      {member.popup_description.upper_description}
                    </p>
                    <p className="text-white text-body !font-[300]">
                      {member.popup_description.lower_description}
                    </p>
                    <div className="flex justify-between items-center mt-10 xl:mt-14 flex-wrap">
                      <div className="">
                        <h2 className="font-body text-white text-[24px] md:text-[30px] mb-2">
                          {member.name}
                        </h2>
                        <p className="font-body text-white text-[16px]  xl:text-[20px] uppercase tracking-[8px] font-[300]">
                          {member.designation}
                        </p>
                      </div>
                      {member.linkedin_url && (
                        <Link
                          className="social_icons popup_icon"
                          href={member.linkedin_url}
                          target="_blank"
                        >
                          <img
                            className="bg-themeMustard w-[40px] rounded-full p-[10px]"
                            src={member.linkedin_icon}
                            alt=""
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="w-max h-[600px] bg-[#200713] relative inner_section ">
                    <button
                      className="border absolute right-5 top-5 w-[50px] h-[50px] text-white rounded-[50px] text-[26px] flex justify-center items-center"
                      onClick={() => closeModal(index)}
                    >
                      <RxCross2 />
                    </button>
                    {member.image_url ? (
                      <img
                        src={member.image_url}
                        className="w-full object-contain h-[600px]"
                        alt={member.name}
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
        )
      )}
    </div>
  );
};

export default Team;
