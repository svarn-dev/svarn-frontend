import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import Link from 'next/link'
import axios from 'axios'
import Image from 'next/image'
import Head from 'next/head'
import { IoClose } from 'react-icons/io5'
import AOS from 'aos'
import 'aos/dist/aos.css'
import parse from 'html-react-parser'
// import parse from 'html-react-parser';

import { Navigation, A11y, Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import Gallery from '@/src/components/Gallery/Gallery'
import Navbar from '@/src/components/Header/Navbar'
import Footer from '@/src/components/Footer/Footer'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export async function getStaticPaths () {
  let allSlugs = []

  try {
    const slugsResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/portfolio`
    )

    allSlugs = slugsResponse.data.map(post => post.slug)
  } catch (error) {
    console.error('Error fetching slugs:', error)
  }

  const paths = allSlugs.map(slug => ({ params: { slug } }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps ({ params }) {
  let featuredData = {}
  let blogsdetail = []
  let YoastData = []
  let hfdata = {}

  try {
    const projectResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/portfolio/?slug=${params.slug}`
    )
    // console.log(projectResponse, "projectResponse");
    blogsdetail = projectResponse.data[0]
    featuredData = projectResponse.data
    YoastData = projectResponse.data[0]
    const headerresponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wp/v2/pages/13`
    )
    // console.log(headerresponse, "headerresponse");
    hfdata = headerresponse.data.acf
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return {
    props: {
      blogsdetail,
      featuredData,
      YoastData,
      hfdata
    }
  }
}

const Portfoliodetail = ({ blogsdetail, YoastData, hfdata }) => {
  // console.log(blogsdetail,"blogsdetail");

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const mainSection = document.querySelector('.Banner_Section')

    setTimeout(() => {
      mainSection.classList.add('scrolled')
    }, 1500)
  }, [])

  const [showPopup, setShowPopup] = useState(false)

  const handleButtonClick = () => {
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showPopup])

  // Brochure Form

  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    PhoneNumber: '',
    Agency: '',
    _wpcf7_unit_tag: '3a82546'
  })
  const [errors, setErrors] = useState({})

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    setErrors({
      ...errors,
      [name]: !value
    })
  }

  const handlePhoneChange = value => {
    setFormData({
      ...formData,
      PhoneNumber: value
    })
    setErrors({
      ...errors,
      PhoneNumber: value.length <= 2
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Validate all required fields
    const newErrors = {
      FullName: !formData.FullName,
      Email: !formData.Email,
      PhoneNumber: formData.PhoneNumber.length <= 2,
      Agency: !formData.Agency
    }

    // If any validation errors exist, update the state and prevent submission
    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors)
      return
    }

    // If no errors, proceed with form submission logic
    console.log('Form submitted', formData)

    const formDataToSend = new FormData()
    for (const key in formData) {
      formDataToSend.append(key, formData[key])
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/contact-form-7/v1/contact-forms/272/feedback`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (response.status === 200) {
        alert('Form submitted successfully!')
        setFormData({
          FullName: '',
          Email: '',
          PhoneNumber: '',
          Agency: '',
          _wpcf7_unit_tag: '3a82546'
        })
        window.open(blogsdetail.acf.portfolio_content.brochure_button_url)
      } else {
        alert('Failed to submit the form.')
      }
    } catch (error) {
      console.error('There was an error submitting the form!', error)
      alert('Failed to submit the form in the catch.')
    }
  }

  return (
    <>
      <Head>
      <meta name="robots" content="index, follow" />
        <title>
          {YoastData &&
          YoastData.yoast_head_json &&
          YoastData.yoast_head_json.title
            ? YoastData.yoast_head_json.title
            : 'Portfolio - Svarn'}
        </title>
        <>{parse(YoastData.yoast_head)}</>
        <link rel='icon' href='./Favicon.png' />
      </Head>
      <div className='Portfolio_detail_Page md:pb-5 pb-[130px]'>
        <Navbar hfdata={hfdata} />
        {/* Banner */}
        <div
          className={`Portfolio_Banner Banner_Section relative flex justify-center items-center h-screen`}
        >
          {blogsdetail.acf.portfolio_content.main_video_url ? (
            <video
              className='w-full h-full object-cover'
              muted
              autoPlay
              playsInline
              loop
              src={blogsdetail.acf.portfolio_content.main_video_url}
            ></video>
          ) : (
            <img src='./placehoder.jpg' alt='' />
          )}
          <div className='absolute text-center px-5 Portfolio_Content'>
            {/* <h1 className="text-center font-heading text-white text-[45px] md:text-[75px] xl:text-[100px] leading-[1.2]">
              {blogsdetail.acf.portfolio_content.button_text}              
            </h1> */}
            <h6 className='font-body uppercase text-white font-medium text-xl md:text-xl mt-[100px]'>
              {blogsdetail.acf.portfolio_content.main_title}
            </h6>
            <p className='font-body text-white text-body !font-[300] '>
              {blogsdetail.acf.portfolio_content.description}
            </p>

            {/* <Link
              href={blogsdetail.acf.portfolio_content.brochure_button_url}
              target="_blank"
              className="btn !block w-full md:w-[250px] text-center mx-auto mt-5"
            >
              {blogsdetail.acf.portfolio_content.brochure_button_text}
            </Link> */}

            <button
              className='btn !block w-full md:w-[250px] text-center mx-auto mt-5'
              target='_blank'
              onClick={handleButtonClick}
            >
              {blogsdetail.acf.portfolio_content.brochure_button_text}
            </button>
          </div>
        </div>
        {/* Description */}
        <div className='w-full bg-themePurple pt-40 pb-20 md:py-20'>
          <div className='container'>
            <div className='Content-Section lg:max-w-[100%] xl:max-w-[70%]'>
              <h2 className='text-white font-body text-[20px] md:text-[25px] lg:text-[35px] xl:text-[56px] leading-[1.2]'>
                {blogsdetail.acf.featured_section.main_description}
              </h2>
              <div className='flex flex-col lg:flex-row'>
                <ul className='flex flex-wrap gap-5 md:gap-7 xl:gap-11 mt-5'>
                  {blogsdetail.acf.featured_section.featured_texts_main_section.featured_text.map(
                    (item, i) => {
                      return (
                        <>
                          <div key={i} className='flex gap-3 items-center'>
                            <img
                              className='w-[25px] h-[25px]'
                              src={item.icon_image}
                            />
                            <Link
                              href={item.location_url}
                              target='_blank'
                              className={`${
                                i < 3 ? 'cursor-text' : 'cursor-pointer'
                              } `}
                            >
                              <li className='text-white font-body text-xl uppercase'>
                                {item.text}
                              </li>
                            </Link>
                          </div>
                        </>
                      )
                    }
                  )}
                </ul>
                {/* <iframe src={blogsdetail.acf.featured_section.map_url} className="w-full lg:w-[400px] h-[150px] mt-5 rounded-[20px]" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
              </div>
            </div>
          </div>
        </div>
        {/* Swiper */}
        <div className='w-full h-screen bg-themeMustard overflow-hidden Slider_Section relative'>
          <Swiper
            className='mySwiper'
            modules={[Navigation, A11y, Pagination, Autoplay]}
            navigation={{
              prevEl: '.custom-prev',
              nextEl: '.custom-next'
            }}
            pagination={{
              clickable: true
            }}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false
            }}
          >
            {blogsdetail.acf.slider_section.slider.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className='w-full h-screen relative flex flex-col justify-end'>
                  <div className='bgImage w-full h-screen'>
                    {slide.background_image ? (
                      <img
                        className='w-full h-full object-cover'
                        src={slide.background_image}
                        alt='Description of the image'
                      />
                    ) : (
                      <img
                        className='w-full h-full'
                        src='/placeholderimage.jpg'
                        alt='Image Placeholder'
                      />
                    )}
                  </div>

                  <div className='w-full lg:pl-0 xl:pl-[10%] pr-[10%] absolute z-10 pb-[100px] lg:pb-[140px] bg-gradient-to-b from-[#d3d1d100] to-themeBlue'>
                    <div className='container'>
                      <h2 className='heading text-2xl font-medium  font-body !text-white'>
                        {slide.heading}
                      </h2>
                      <p className='text-body font-[300] !text-white mt-4'>
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='custom-navigation-wrapper absolute max-w-[1400px] px-4 py-0 left-0 bottom-[30%] md:bottom-[150px] 2xl:bottom-[110px] right-5 2xl:-right-[140px] m-auto'>
            <div className='custom-prev swiper-button-prev !right-[80px] md:!right-0'></div>
            <div className='custom-next swiper-button-next !top-0 md:!top-[-80px]'></div>
          </div>
        </div>
        {/* Ammenities */}
        <div
          className='w-full h-max py-20 overflow-x-hidden'
          style={{
            background: `url(${blogsdetail.acf.amenities_slider.background_image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className='relative'>
            <div className='container'>
              <h2 className='text-[40px] font-heading text-white leading-[1.2] uppercase'>
                {blogsdetail.acf.amenities_slider.main_heading}
              </h2>
              <p className='text-white text-body !font-[300] mt-4 max-w-[700px]'>
                {blogsdetail.acf.amenities_slider.description}
              </p>
            </div>
            <div className='w-full h-full mt-10 Gallery_Block'>
              <Gallery blogsdetail={blogsdetail} />
            </div>
          </div>
        </div>
        {/* Three Boxes */}
        <div className='Items_Card flex flex-col md:!flex-row h-full md:h-[50vh] lg:h-[70vh] xl:h-screen overflow-hidden'>
          {blogsdetail.acf.three_boxes_section.image_and_text.map((item, i) => {
            return (
              <>
                <div
                  className='text-center flex justify-center items-center  portfolio_Cards'
                  key={i}
                >
                  {item.background_image ? (
                    <img
                      className='w-full h-full object-cover'
                      src={item.background_image}
                      alt='Img'
                    />
                  ) : (
                    <img src='./placeholder.img' alt='Placeholder' />
                  )}
                  <h3 className='text-[20px] lg:text-[25px] xl:text-[32px] leading-[1.2] px-5 text-white absolute font-body text-center font-normal max-w-[500px]'>
                    {item.heading}
                  </h3>
                </div>
              </>
            )
          })}
        </div>
        {/* Location */}
        {/* <section
          className="w-full flex location_Box"
          style={{
            background: `#fff url(${blogsdetail.acf.location_section.map_url})`,
            backgroundSize: "60%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
          }}
        >
          <div className="w-full lg:flex justify-between items-center">
            <div className="w-full lg:w-[50%] !pl-5 !px-5 md:!pl-5 xl:!pl-[10%] 2xl:!pl-[20%] xl:w-[40%] text-white location-content !bg-white xl:bg-transparent !py-10 xl:!py-[8rem]">
              <h2 className="text-4xl font-heading text-themePurple">
                {blogsdetail.acf.location_section.main_heading}
              </h2>
              <h5 className="text-xl !max-w-full xl:!max-w-[500px] font-body text-themePurple mt-5 xl:mt-10">
                {blogsdetail.acf.location_section.content}
              </h5>
              <p className="font-normal text-base !max-w-full xl:!max-w-[500px] font-body text-themePurple mt-1 xl:mt-3">
                {blogsdetail.acf.location_section.description}
              </p>
            </div>
            <iframe src={blogsdetail.acf.location_section.map_url} className="w-full lg:w-[50%] h-[350px] xl:h-[600px]" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </section> */}

        <section
          className='w-full flex location_Box'
          style={{
            background: `#fff url(${blogsdetail.acf.location_section.map_url})`,
            backgroundSize: '60%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right'
          }}
        >
          <div className='container !px-0 2xl:!pr-5'>
            <div className='w-full lg:w-[50%]  !px-5 md:!pl-5 2xl:!pl-[0px] xl:w-[40%] text-white location-content !bg-white xl:bg-transparent !py-10 xl:!py-[8rem]'>
              <h2 className='text-4xl font-heading text-themePurple'>
                {blogsdetail.acf.location_section.main_heading}
              </h2>
              <h5 className='text-[20px] xl:text-2xl !max-w-full xl:!max-w-[500px] font-body text-themePurple mt-5 xl:mt-10'>
                {blogsdetail.acf.location_section.content}
              </h5>
              <p className='text-[16px] xl:text-xl !max-w-full xl:!max-w-[500px] font-body text-themePurple mt-1 xl:mt-3'>
                {blogsdetail.acf.location_section.description}
              </p>

              <div className='flex gap-3 items-center mt-5 xl:mt-10'>
                <img
                  className='w-[25px] h-[25px] invert'
                  src={
                    blogsdetail.acf.featured_section.featured_texts_main_section
                      .featured_text[3].icon_image
                  }
                />
                <Link
                  href={
                    blogsdetail.acf.featured_section.featured_texts_main_section
                      .featured_text[3].location_url
                  }
                  target='_blank'
                  className='cursor-pointer'
                >
                  <li className='text-black font-body text-xl list-none uppercase'>
                    {
                      blogsdetail.acf.featured_section
                        .featured_texts_main_section.featured_text[3].text
                    }
                  </li>
                </Link>
              </div>
            </div>
            <div className='map w-full lg:w-[60%] block lg:hidden'>
              <img
                className='w-full h-full'
                src={blogsdetail.acf.location_section.map_url}
              />
            </div>
          </div>
        </section>

        {/* Bottom Bar */}
        <div className='w-full fixed bottom-0 left-0 right-0 bg-themePurple text-white hidden lg:block Bottom_Bar'>
          <div className='container'>
            <div className='Main_Bar flex flex-wrap justify-between items-center'>
              <div className='flex flex-wrap gap-3 items-center w-full xl:w-[80%]'>
                <h2 className='font-heading text-[40px]'>
                  {blogsdetail.acf.portfolio_content.button_text}
                </h2>
                <ul className='flex gap-4'>
                  {/* <p className="max-w-[200px]">
                    {blogsdetail.acf.bottom_bar.text}
                  </p> */}
                  {blogsdetail.acf.featured_section.featured_texts_main_section.featured_text.map(
                    (item, i) => {
                      return (
                        <>
                          <div key={i} className='flex gap-3'>
                            <img
                              className='w-[25px] h-[25px]'
                              src={item.icon_image}
                            />
                            <li className='text-white font-body text-sm uppercase'>
                              {item.text}
                            </li>
                          </div>
                        </>
                      )
                    }
                  )}
                </ul>
              </div>
              <Link
                className='btn w-full xl:w-[20%] text-center'
                href='/contact'
              >
                {blogsdetail.acf.bottom_bar.button_text}
              </Link>
            </div>
          </div>
        </div>
        <Footer hfdata={hfdata} />
      </div>

      {/* Popup */}

      {showPopup && (
        <div className='fixed !z-[9999] !top-0 left-0 flex bg-[#000000ad] items-center justify-center w-full h-screen popup_block px-5 xl:px-0 pb-0 xl:pb-10'>
          <div className='relative max-w-[500px] w-full'>
            <div className='bg-themePurple rounded-[50px] p-10 pt-[70px] relative'>
              <h3 className='text-[30px] text-white font-body capitalize font-medium'>
                Please fill the form
              </h3>
              <button
                className='absolute text-[30px] right-[50px] top-[40px] text-white'
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
  )
}

export default Portfoliodetail
