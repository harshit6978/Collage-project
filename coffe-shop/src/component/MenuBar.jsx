import React from 'react'
import "../index.css"
import america from "../assets/menu-1.jpg";
import latte from "../assets/late.jpg"
import hot from "../assets/hot.jpg"
import double from "../assets/DOUBLE-AMERIKANO-scaled.jpg"
import black from "../assets/Long_Black-min_2048x.jpg"
import capuchino from "../assets/Cappuccino.jpg"
import { FaRupeeSign } from 'react-icons/fa';
const MenuBar = () => {
    return (
        <section id="menu" class="coffee_menu pt-120 pb-130 bg_cover" style={{ background: "url(assets/images/coffee_menu_bg.jpg)" }}>
            <div class="containeris">
                <div class="rows justify-content-center">
                    <div class="col-lg-6">
                        <div class="section_title text-center pb-30">
                            <h4 class="title">Special Coffee Items</h4>
                            <span class="line">
                                <span class="box"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="coffee_menu_wrapper">
                            <div class="single_coffee_menu mt-30 d-flex align-items-center wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.2s">

                                <div class="coffee_menu_image">
                                    <img src={america} alt="coffee" />
                                </div>
                                <div class="coffee_menu_content media-body">
                                    <h4 class="coffee_name">Americano<span class="price"><FaRupeeSign className='mt-2'/>270</span></h4>
                                    <p> An americano is just water and espresso.served 1/3 espresso 2/3 water</p>
                                </div>
                            </div>
                            <div class="single_coffee_menu mt-30 d-flex align-items-center wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.5s" >
                                <div class="coffee_menu_image">
                                    <img src={hot} alt="coffee" />
                                </div>
                                <div class="coffee_menu_content media-body">
                                    <h4 class="coffee_name">Hot Chocolate<span class="price"><FaRupeeSign className='mt-2'/>180</span></h4>
                                    <p>hot chocolate is a dreamy treat cold day hot cocoa kitchen ingredients</p>
                                </div>
                            </div>
                            <div class="single_coffee_menu mt-30 d-flex align-items-center wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.8s" >
                                <div class="coffee_menu_image">
                                    <img src={double} alt="coffee" />
                                </div>
                                <div class="coffee_menu_content media-body">
                                    <h4 class="coffee_name">Double Americano<span class="price"><FaRupeeSign className='mt-2'/>250</span></h4>
                                    <p>Lorem ipsum dolor sit amet, cosadipscing elitr, sed diam nonumy eirmod.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="coffee_menu_wrapper">
                            <div class="single_coffee_menu mt-30 d-flex align-items-center wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.2s" >
                                <div class="coffee_menu_image">
                                    <img src={latte} alt="coffee" />
                                </div>
                                <div class="coffee_menu_content media-body">
                                    <h4 class="coffee_name">Latte<span class="price"><FaRupeeSign className='mt-2'/>200</span></h4>
                                    <p>A Latte or Caffè Latte is a milk coffee that boasts a silky layer</p>
                                </div>
                            </div>
                            <div class="single_coffee_menu mt-30 d-flex align-items-center wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.5s" >
                                <div class="coffee_menu_image">
                                    <img src={black} alt="coffee" />
                                </div>
                                <div class="coffee_menu_content media-body">
                                    <h4 class="coffee_name">Long Black<span class="price"><FaRupeeSign className='mt-2'/>110</span></h4>
                                    <p>Lorem ipsum dolor sit amet, cosadipscing elitr, sed diam nonumy eirmod.</p>
                                </div>
                            </div>
                            <div class="single_coffee_menu mt-30 d-flex align-items-center wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.8s">
                                {/* style="visibility: visible; animation-duration: 1.3s; animation-delay: 0.8s; animation-name: fadeInUp;" */}
                                <div class="coffee_menu_image">
                                    <img src={capuchino} alt="coffee" />
                                </div>
                                <div class="coffee_menu_content media-body">
                                    <h4 class="coffee_name">Cappuccino<span class="price"><FaRupeeSign className='mt-2'/>300</span></h4>
                                    <p>Lorem ipsum dolor sit amet, cosadipscing elitr, sed diam nonumy eirmod.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
}

export default MenuBar