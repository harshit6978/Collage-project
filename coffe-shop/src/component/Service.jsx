import React from 'react'
import sheef from "../assets/sheef.png"
const Service = () => {
    return (
        <div className=''>
            <div class="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
                <div class="container mx-auto py-[2vh]">
                    <div class="grid grid-cols-1 relative lg:grid-cols-2 gap-8 items-center">
                        <img src={sheef} alt="" class="h-[32rem] mx-auto justify-end" />
                        <div class=" w-full md:w-[32rem] flex flex-col space-y-6 "><div class="text-2xl md:text-3xl font-bold text-[#2e2e2e] lg:text-4xl">We are <span class="text-[#f54748]">more</span> than <span class="text-[#fdc55e]">multiple</span> service</div>
                            <div class="lg:text-lg text-[#191919] md:text-base text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus maxime quibusdam nemo! Cumque explicabo adipisci consequuntur nobis laboriosam at vero?</div>
                            <div class="flex gap-8 items-center">
                                <button class=" bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white"  x>About us</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service