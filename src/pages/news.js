import axios from "axios";
import Link from "next/link";
import React from "react";

const news = ({allnewsData}) => {
    // console.log(allnewsData, "allnewsData");
  return(
    <>
    <div className="w-full h-screen bg-themeMustard flex justify-center items-center">
      {allnewsData.map((item,i)=>{
        return(
            <Link key={i} href={`news/${item.slug}`} className="tex-white border">{item.acf.news_cpt_content.main_title}</Link>
          )
      })}  
      </div>
    </>

    )
};

export async function getStaticProps() {
  let newsData = {};
  let allnewsData = [];

  try {
    const newsResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/pages/301`
    );
    newsData = newsResponse.data.acf;

    const allnews = newsResponse.data.acf.news || [];
    const newsIdsToFetch = allnews.join(",");
    const Data = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/news?include=${newsIdsToFetch}`
    );
    allnewsData = Data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return {
    props: {
        allnewsData
    },
    revalidate: 3600,
  };
}

export default news;
