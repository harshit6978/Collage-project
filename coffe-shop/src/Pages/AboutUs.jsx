import React from 'react'
import "./../App.css"
import Carousel from '../component/Carousel'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'

const AboutUs = () => {
    return (
        <div class="grid-banner color-background-1 gradient no-heading custom-about-grid-banner ">
            <div class=" page-widthi pt-28 pb-9 mx-28 section-template--17038101872861__74272bca-06aa-465a-8a5d-75ae7bb9d85a-padding isolate">
                <div class="row">
                    <div class="grid-banner-wrapper">
                        <div class="grid-banner-section one-column list  background-none">
                            <div class="grid-banner-wrapper  ">
                                <div class="grid-banner-block-image">

                                    <img class="grid-banner-image rounded-md" sizes="100vw" src="//bt-decaf.myshopify.com/cdn/shop/files/Cafe-About2.jpg?v=1707190987&amp;width=1500" loading="lazy" alt="" width="1300" height="1300" />

                                </div>
                                <div class="grid-banner-content ">
                                    <div class="grid-banner-inner banner--content-align-left  ">

                                        <h5 class="sub-title mt-0 mb-3 text-amber-900 font-serif font-medium text-2xl">Discover Our Coffee Initiatives</h5>


                                        <h4 class="main-title mt-3 text-4xl font-serif">

                                            Explore our coffee initiatives and discover how they enhance your coffee experience.

                                        </h4>


                                        <p class="description mt-3 mb-1 text-amber-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>


                                        <a href="/" class="banner-button button button--primary p-3 bg-amber-900 w-28 h-12 text-center mt-3 rounded-lg text-white">Shop now</a>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-40 pb-8   justify-center text-center text-2xl font-serif'>
                <div className='bg-amber-900 w-96 justify-center text-center rounded-3xl text-white m-auto p-2 flex'><FaAngleDoubleLeft className='mt-[5px] mr-2 text-xl' />
                    Our New Products Soon <FaAngleDoubleRight className='mt-[5px] ml-2 text-xl' />
                </div>
            </div>

            <Carousel />
        </div>


    )
}

export default AboutUs