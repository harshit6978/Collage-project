import React from 'react'
import bisc from "../assets/biscit.jpg"
import cup from "../assets/cup.jpg"
import ccup from "../assets/c cup.jpg"
import mac from "../assets/cmac.jpg"
import cake from "../assets/cake.jpg"
import jar from "../assets/jar.jpeg"
import pan from "../assets/pan.jpg"
import waffle from "../assets/waffle.jpg"
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
const Carousel = () => {
    return (
        <>
            <div className='mt-40 pb-8   justify-center text-center text-2xl font-serif'>
                <div className='bg-amber-900 w-96 justify-center text-center rounded-3xl text-white m-auto p-2 flex'><FaAngleDoubleLeft className='mt-[5px] mr-2 text-xl' />
                    Our New Products Soon <FaAngleDoubleRight className='mt-[5px] ml-2 text-xl' />
                </div>
            </div>

            <div className="carousel carousel-end rounded-box">
                <div id="item1" className="carousel-item m-4">
                    <img src={waffle} alt="Drink" className='rounded-xl' />
                </div>
                <div id='item2' className="carousel-item m-4 ">
                    <img src={cup} alt="Drink" className='rounded-xl' />
                </div>
                <div id="item3" className="carousel-item m-4 ">
                    <img src={bisc} alt="Drink" className='rounded-xl' />
                </div>
                <div id="item4" className="carousel-item m-4 ">
                    <img src={ccup} alt="Drink" className='rounded-xl' />
                </div>
                <div id="item5" className="carousel-item m-4 ">
                    <img src={mac} alt="Drink" className='rounded-xl' />
                </div>
                <div id="item6" className="carousel-item m-4 ">
                    <img src={cake} alt="Drink" className='rounded-xl' />
                </div>
                <div id='item7' className="carousel-item m-4 ">
                    <img src={jar} alt="Drink" className='rounded-xl' />
                </div>
                <div id="item8" className="carousel-item m-4 ">
                    <img src={pan} alt="Drink" className='rounded-xl' />
                </div>
            </div>

            <div className="flex justify-center w-full py-9 gap-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
                <a href="#item4" className="btn btn-xs">4</a>
                <a href="#item5" className="btn btn-xs">5</a>
                <a href="#item6" className="btn btn-xs">6</a>
                <a href="#item7" className="btn btn-xs">7</a>
                <a href="#item8" className="btn btn-xs">8</a>
            </div>
        </>


    )
}

export default Carousel
