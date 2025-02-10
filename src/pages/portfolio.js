import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";

import "aos/dist/aos.css";

const portfolio = ({ projectsData, YoastData }) => {
  return (
    <>
      {/* <Head>
        <title>
          {YoastData &&
          YoastData.yoast_head_json &&
          YoastData.yoast_head_json.title
            ? YoastData.yoast_head_json.title
            : "Portfolio - Svarn"}
        </title>
        <>{parse(YoastData.yoast_head)  }</>
        <link rel="icon" href="./irth_logo_dark.svg" />
      </Head> */}

      <div className="w-full h-screen bg-themeMustard flex justify-center items-center">
        {projectsData.map((project, index) => (
          <Link href={`portfolio/${project.slug}`} key={index} className="z-50">
            <p className=" !text-black ">
              {project.acf.portfolio_content.main_title}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  let portfolioData = {};
  let projectsData = [];
  let YoastData = {};

  try {
    const portfolioResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/pages/136`
    );
    portfolioData = portfolioResponse.data.acf;
    YoastData = portfolioResponse.data;

    const projects = portfolioResponse.data.acf.portfolios || [];
    const projectIdsToFetch = projects.join(",");
    const Data = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/portfolio?include=${projectIdsToFetch}`
    );
    projectsData = Data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    props: {
      portfolioData,
      projectsData,
      YoastData,
    },
    revalidate: 3600,
  };
}

export default portfolio;
