import React from 'react'
import { FaHeart, FaRupeeSign, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Foods = ({ curElem }) => {
    return (
        <div className='food-card flex bg-red-500/10 rounded-xl flex-col cursor-pointer items-center p-5'>
            <div className='relative mb-3'>
                <Link to={`/menu/${curElem?._id}`}>
                    <img src={curElem?.foodImage} />
                </Link>
                <div className='absolute top-2 left-2'>
                    <button className='shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-5 rounded-full relative'>
                        <FaHeart className='absolute text-xl top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2' />
                    </button>
                </div>

                <div className='absolute bottom-2 right-2'>
                    <button className='shadow-sm bottom-4 border-white text-white bg-[#fdc55e] cursor-pointer p-3 h-16 w-16 text-xl font-bold rounded-full relative'>
                        <div className='absolute flex text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                            <FaRupeeSign className='mt-1' />{curElem.price}
                        </div>
                    </button>
                </div>
            </div>

            {/* rating part  */}
            <div className='flex gap-4 items-center'>
                <p className='text-xl text-center font-bold text-[#f54748]'>{curElem.name}</p>
                <div className='flex text-sm space-x-2 cursor-pointer'>
                    {/* <span className='font-normal text-[#fdc55e]'>4.3</span> */}
                    {/* <FaStar size={16} className='text-[#fdc55e]' /> */}
                    <span className='font-medium'>({curElem?.qty})</span>
                </div>
            </div>
            {/* <button className='bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white'>Order Now</button> */}
        </div>
    )
}

export default Foods