import React from 'react'
import { FaPlay, FaSearch } from "react-icons/fa"
// import header from "../assets/banner.png"
import Font, { Text } from 'react-font'

import "../App.css"
const Header = () => {
    return (
        // <div className='py-3 px-10 sm:px-4 md:px-6 lg:px-6'>
        //     <div className='container mx-auto py-[18vh]'>
        //         <div className='grid grid-cols-1 relative lg:grid-cols-2 gap-8 items-center'>
        //             <div className='lg:w-[35rem] w-full  flex flex-col space-y-6'>
        //                 <div className='text-4xl md:text-5xl font-bold text-[#2e2e2e] lg:text-6xl'>
        //                     We are  <span className='text-[#f54748]'>
        //                         Serious
        //                     </span> For <span className='text-[#f54748]'>Food</span> & <span className='text-[#Fdc55e]'>Delivery .</span>
        //                 </div>

        //                 <div className='lg:text-xl text-[#191919] md:text-lg text-base'>
        //                     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
        //                 </div>

        //                 {/* Search button */}
        //                 <div className='flex rounded-full py-2 justify-between items-center bg-white shadow-md'>
        //                     <div className='flex items-center ml-5'>
        //                         <FaSearch size={22} className='cursor_pointer' />
        //                         <input type='text' placeholder='Search Food here...' className='text-[#191919] w-full border-none outline-none py-2 px-4'></input>
        //                     </div>

        //                     {/* <div className='h-10 w-10 bg-[#fdc55e] rounded-full mr-4'>
        //                         <FaSearch size={15} className='cursor_pointer text-white absolute top-[77%] left-[35%] -translate-x-1/2 -translate-y-1/2 ' />
        //                     </div> */}
        //                 </div>

        //                 <div className='flex  gap-8 items-center'>
        //                     <button className='bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white'>explore more</button>
        //                     <div className='sm:flex hidden  gap-4 items-center'>
        //                         <div className='h-14 w-14 shadow-md cursor-pointer relative bg-white rounded-full'>
        //                             <FaPlay size={18} className='cursor-pointer text-[#f54748] absolute top-[35%] left-[40%]' />
        //                         </div>

        //                         <div className='lg-text-xl  text-[#191919] md:text-lg text-base cursor-pointer'>
        //                             Watch Now
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>

        //             <img src={header} alt='' className='h-[28rem] mx-auto justify-end' />
        //         </div>
        //     </div>
        // </div>

        <div class="farzi-video-pop">
            <div class="color-inverse gradient section-template--17038101807325__931610d8-acd1-4d51-a643-835d7e5cc104-cover_image video-banner ">
                <div class="video-section   isolate section-template--17038101807325__931610d8-acd1-4d51-a643-835d7e5cc104-padding content-style-overlay">
                    <div class="container">
                        <div class="video-section__content page-width"><div class="title-wrapper title-wrapper--no-top-margin">
                            <h2 class="title h-7 font-sans font-black">
                                <Text family='Lobster' style={{ fontSize: 60, margin: 0 }} className='text-white'>
                                    Start Your Day With Coffee
                                </Text>
                            </h2>

                        </div>
                            <div class="text-wrapper text-wrapper--no-top-margin">
                                <p class="text h4 text-white font-serif" >
                                    <Text family='Kalam' style={{ fontSize: 20, margin: 0 }} className='text-white' >

                                        it's a moment of pause in the chaos of the world, a sensory journey that starts with the earthy aroma of freshly ground beans and culminates in the warmth that spreads through your body with each sip
                                    </Text>
                                </p>
                            </div>
                        </div>
                    </div>

                    <video loop muted autoPlay playsInline class="autoplay-video">
                        <source src="https://cdn.shopify.com/videos/c/o/v/2a3fcf8f4d594087b9782c3a02cf0578.mp4" type="video/mp4" />
                    </video>

                </div>
            </div>
        </div>
    )
}

export default Header