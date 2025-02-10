

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Header/Navbar';
import axios from 'axios';
import Footer from '../components/Footer/Footer';
import Whatsapp from '../components/Whatsapp/Whatsapp';


const Layout = ({ children, }) => {

  // const [hfdata, setHfdata] = useState(null);

  // useEffect(() => { 
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/pages/13`
  //     );
  //     setHfdata(response.data.acf);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  return (
    <>
    {/* <Navbar hfdata={hfdata} /> */}
    {children}  
    <Whatsapp/>
    {/* <Footer hfdata={hfdata} /> */}
    </>
  );
}




export default Layout;

