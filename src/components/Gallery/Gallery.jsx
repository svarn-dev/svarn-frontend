import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Grid, Autoplay } from "swiper/modules";
import { RxCross2 } from "react-icons/rx";

const Gallery = ({ blogsdetail }) => {
  const [galleryPopup, setGallerypopup] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);

  const openGallery = (index) => {
    setClickedIndex(index);
    setGallerypopup(true);
  };

  const closeGallery = () => {
    setGallerypopup(false);
    setClickedIndex(null);
  };

  useEffect(() => {
    if (galleryPopup) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup function to remove the class if the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [galleryPopup]);

  return (
    <Swiper
      slidesPerView={1}
      grid={{
        rows: 2,
      }}
      spaceBetween={0}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      modules={[Grid, Autoplay]}
      className="mySwiper !overflow-visible"
      breakpoints={{
        1100: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 3,
        },
        767: {
          slidesPerView: 2,
        },
        426: {
          slidesPerView: 1,
        },
      }}
    >
      {blogsdetail.acf.amenities_slider.slider.slider_item?.map(
        (item, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full p-3 flex flex-col Gallery_Image">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  onClick={() => openGallery(index)}
                  className="max-w-full object-cover cursor-pointer h-[230px] md:h-auto"
                  alt="Amenity"
                />
              ) : (
                <img
                  src="/placeholder.png"
                  className="max-w-full object-cover border cursor-pointer"
                  alt="Placeholder"
                />
              )}
              <p className="text-black bg-themeMustard py-3 px-3 font-body text-body">
                {item.text}
              </p>
            </div>
          </SwiperSlide>
        )
      )}
      {galleryPopup && (
        <div className="fixed !z-50 !top-0 left-0 flex items-center justify-center w-full h-screen bg-[#000000ad] popup_block px-5 xl:px-0 pb-0 xl:pb-10">
          <div className="flex justify-center relative">
            <img
              src={
                blogsdetail.acf.amenities_slider.slider.slider_item[
                  clickedIndex
                ]?.image_url
              }
              className=" w-full max-w-full max-h-[450px] xl:max-h-[600px] object-cover"
              alt="Current View"
            />
            <button
              onClick={closeGallery}
              className="px-[10px] py-[10px] xl:px-4 xl:py-4 text-lg bg-white text-gray-600 rounded-[50%] hover:bg-themePurple hover:border-white hover:text-white border absolute right-[20px] top-[20px]"
            >
              <RxCross2 className="text-[#BD8F2F] text-[20px] xl:text-[30px]" />
            </button>
          </div>
        </div>
      )}
    </Swiper>
  );
};

export default Gallery;
