import axios from "axios";
import Link from "next/link";
import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import Form from "../components/Contact/Form";
import Head from "next/head";
import parse from "html-react-parser";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";

const contact = ({ HomeData, ContactData, hfdata, YoastData }) => {
  return (
    <>
      <Head>
        <title>
          {YoastData &&
            YoastData.yoast_head_json &&
            YoastData.yoast_head_json.title
            ? YoastData.yoast_head_json.title
            : "Contact - Svarn"}
        </title>
        <>{parse(YoastData.yoast_head)}</>
        <link rel="icon" href="./Favicon.png" />
      </Head>
      <Navbar hfdata={hfdata} />

      <section className="ContactBanner Banner bg-themePurple !relative w-full h-screen flex justify-center items-center">
        {/* {HomeData.banner.background_video_url ? (
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
        )} */}

        <div className="Contact_Page absolute w-full h-[100%] pt-[80px] pb-[80px]">
          <div className="container flex h-full flex-wrap">
            <div className="half-Section w-full md:w-[50%] xl:w-[60%] flex flex-col justify-start gap-[4.5rem] md:gap-[11rem] px-5 xl:px-0 pl-0">
              <div>
                <h1 className="text-left font-heading text-white !text-[23px] lg:!text-[30px] xl:!text-[40px] max-w-[60%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] !leading-normal">
                  {ContactData.main_section.page_content.page_title}
                </h1>
                <p className="text-white font-body text-xl mt-4">
                  {ContactData.main_section.page_content.description}
                </p>
              </div>
              <div className="Social_Box bg-themePurple w-full md:w-[430px] mt-0 lg:mt-0 md:mt-0 p-0 rounded-[40px]">
                <div className="mx-0 mb-7">
                  <h5 className="text-body text-[#ffffff70] text-base !font-[300] mb-2">
                    {hfdata?.locations.location_title}
                  </h5>
                  <ul className="text-white Info-Section gap-3">
                    <li className="text-body text-white text-xl !font-[400]">
                      {hfdata?.locations.address_one}
                    </li>
                    <iframe src={ContactData.main_section.page_content.map_url} className="w-full lg:w-[400px] h-[150px] mt-5 rounded-[20px]" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <li className="text-body text-white text-xl !font-[400]">
                      {hfdata?.locations.address_two}
                    </li>
                    <li className="text-body text-white text-xl !font-[400]">
                      {hfdata?.locations.address_city}
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-body text-[#ffffff70] text-base !font-[300] mb-2">
                    {hfdata?.contact.contact_title}
                  </h5>
                  <ul className="text-white flex Info-Section gap-3">
                    <li className="text-body text-white hover:underline text-xl !font-[400]">
                      <Link href={`mailto:${hfdata?.contact.contact_mail}`}>{hfdata?.contact.contact_mail}</Link><br />
                      <Link href={`tel:${hfdata?.contact.contact_number}`}>{hfdata?.contact.contact_number}</Link>
                    </li>
                    {/* <li className="text-body text-white text-xl hover:underline !font-[400]">
                      <Link href="#">{hfdata?.contact.contact_number}</Link>
                    </li> */}
                  </ul>
                </div>
                <div className="social_icons flex gap-4 mt-9">
                  {hfdata?.social_icons.facebook_url && (
                    <Link
                      href={hfdata?.social_icons.facebook_url}
                      className="text-black bg-themeMustard"
                      target="_blank"
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
            <div className="half-Section w-full md:w-[50%] xl:w-[40%] pl-0 md:pl-5 lg:pl-[30px] md:px-5 pt-[50px] md:pt-[0px]">
              <h2 className="text-left font-heading text-themeMustard text-[40px] leading-[1.2]">
                {ContactData.main_section.contact_form_column.heading}
              </h2>
              <p className="text-black font-body text-base mt-4">
                {ContactData.main_section.contact_form_column.description}
              </p>
              <Form />
            </div>
          </div>
        </div>
      </section>
      <Footer hfdata={hfdata} />
    </>
  );
};

export async function getStaticProps() {
  let HomeData = {};
  let ContactData = {};
  let hfdata = {};
  let YoastData = {};

  try {
    const homeResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/pages/37`
    );
    HomeData = homeResponse.data.acf;

    const ContactResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/pages/254`
    );
    ContactData = ContactResponse.data.acf;
    YoastData = ContactResponse.data;

    const SocialData = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/pages/13`
    );
    hfdata = SocialData.data.acf;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return {
    props: {
      HomeData,
      ContactData,
      hfdata,
      YoastData,
    },
    revalidate: 3600,
  };
}

export default contact;
