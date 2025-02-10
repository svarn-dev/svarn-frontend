import axios from "axios";
import React from "react";

export async function getStaticPaths() {
    let allSlugs = [];
  
    try {
      const slugsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/news`
      );
  
      allSlugs = slugsResponse.data.map((post) => post.slug);
    } catch (error) {
      console.error("Error fetching slugs:", error);
    }
  
    const paths = allSlugs.map((slug) => ({ params: { slug } }));
  
    return {
      paths,
      fallback: "blocking",
    };
  }
  
  export async function getStaticProps({ params }) {
    let featuredData = {};
    let blogsdetail = [];
  
    try {
      const projectResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/news/?slug=${params.slug}`
      );
      blogsdetail = projectResponse.data[0];
      featuredData = projectResponse.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  
    return {
      props: {
        blogsdetail,
        featuredData,
      },
    };
  }
  

const newsdetail = ({blogsdetail}) => {
  return (
    <div className="w-full h-screen bg-themeMustard flex justify-center items-center">
        <p>{blogsdetail.title.rendered}</p>
    </div>

)
};

export default newsdetail;
