import React from 'react'
import "../index.css"
import { FaMailBulk, FaMobileAlt, FaSearchLocation } from 'react-icons/fa'
const Contactus = () => {

    return (

        <>
            <div class="page-banner-section section relative pt-32 py-24 w-[100%]">
                <div class="w-[1340px] mr-auto ml-auto pr-12 pl-12">
                    <ul class="breadcrumb flex flex-wrap justify-center m-0 p-0 list-none gap-2">
                        <li className='flex uppercase text-white gap-2'><a href="/">Home</a></li>
                        <li className='flex uppercase text-white gap-2'>Contact Us</li>
                    </ul>
                </div>
            </div>


            <div class="section section-padding py-28 w-[100%]">
                <div class="w-[1340px] mr-auto ml-auto pr-12 pl-12">
                    <div class="flex flex-wrap mt-4 mr-4 ml-4 ">
                        <div class="col w-[50%] pr-4 pl-4 pt-4">
                            <div class="mb-10">

                                <h2 class="text-2xl mb-12">Keep in Touch</h2>
                            </div>
                            <ul class="m-0 p-0 list-none">
                                <li className='text-lg flex gap-5 flex-wrap'><FaSearchLocation  className='text-4xl'/>Address goes here, street, <br /> Crossroad 123.</li>
                                <li className='mt-6 text-lg flex gap-5 flex-wrap'><FaMailBulk className='text-4xl'/>info@example.com </li>
                                <li class="mt-6 text-lg flex gap-5 flex-wrap" ><FaMobileAlt className='text-4xl' />+91 7852140287</li>
                            </ul>
                        </div>
                        <div class="col w-[50%] pr-4 pl-4 pt-4 ">
                            <div class="contact-form">
                                <form id="contact-form" action="/">
                                    <div class="flex flex-wrap mt-4 mr-4 ml-4 gap-4">
                                    <div className='flex gap-28 '>
                                        <div class="w-1/2"><input class="bg-transparent text-sm w-full h-14 py-3 px-6 border border-solid border-red-600" name="name" type="text" placeholder="Name" /></div>
                                        <div class="w-1/2"><input class="bg-transparent text-sm w-full h-14 py-3 px-6 border border-solid border-red-600" name="email" type="email" placeholder="Email" /></div>
                                    </div>
                                        <div class="w-full"><input class="bg-transparent text-sm w-full h-14 py-3 px-6 border border-solid border-red-600" name="subject" type="text" placeholder="Subject" /></div>
                                        <div class="w-full"><textarea class="bg-transparent text-sm w-full h-36 py-3 px-6 border border-solid border-red-600" name="message" placeholder="Message"></textarea></div>
                                        <div class="w-full"><button class=" text-base font-semibold inline-flex text-center text-white pl-[250px] py-5 px-10 gap-2 w-full bg-red-500 rounded" type="submit"  >Submit</button></div>
                                    </div>
                                </form>
                                <p class="form-messege"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Contactus
