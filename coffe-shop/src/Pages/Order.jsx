import React from 'react'
import logo from "../assets/logo.png"
import { NavLink, useNavigate } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useCartContext } from '../../context/cartContext';
import { useUserContext } from '../../context/userContext';
import { useStripe } from "@stripe/react-stripe-js";
import axios from 'axios';
import { FaRupeeSign } from 'react-icons/fa';

const Order = () => {

    const { cartItems, removeItem, addToCart } = useCartContext();
    const itemPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    const taxPrice = itemPrice * 0.10;
    const fixtax = taxPrice.toFixed(2);
    const shippingPrice = itemPrice < 2000 ? 50 : 0
    const totalPrice = itemPrice + shippingPrice + parseInt(fixtax);
    const { user } = useUserContext()
    const stripe = useStripe()

    const handleFinish = async () => {
        try {
            const orderItems = cartItems.map(item => ({
                food: item._id,
                qty: item.qty
            }))
            console.log(orderItems, "order");
            
            const res = await axios.post(`http://localhost:8000/api/v1/order/order`, {
                user: user?.user._id,
                items: orderItems,
                totalAmount: totalPrice,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(res, "ess");

            if (res.data.success) {
                const result = await stripe.redirectToCheckout({
                    sessionId: res.data.sessionId
                })
                console.log(stripe,"resulll");
                toast.success(res.data.message)
            } else {

                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Somithing went wrog ")
        }
    }
    return (
        <div className=" h-screen pt-[26vh]">
            <div className=" ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-[28rem] mx-auto flex flex-col items-center rounded-md px-8 py-5" >
                <NavLink to="/">
                    <img src={logo} alt="" className="logo mb-6 cursor-pointer text-center h-[110px]" />
                </NavLink>
                <div className='text-xl flex text-[#2e2e2e] mb-3'>
                    items Price : <span className='text-[#f54748] flex'><FaRupeeSign className='text-xl mt-1'/>{itemPrice}</span>
                </div>
                <div className='text-xl flex text-[#2e2e2e] mb-3'>
                    Tax Price : <span className='text-[#f54748] flex'><FaRupeeSign className='text-xl mt-1'/>{taxPrice}</span>
                </div>
                <div className='text-xl flex text-[#2e2e2e] mb-3'>
                    Shipping Price : <span className='text-[#f54748] flex'><FaRupeeSign className='text-xl mt-1'/>{shippingPrice}</span>
                </div>
                <div className='text-xl flex  text-[#2e2e2e] mb-3'>
                    Total Price : <span className='text-[#f54748] flex'><FaRupeeSign className='text-xl mt-1'/>{totalPrice}</span>
                </div>

                <button className=" bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl flex pl-40 font-medium text-white mx-auto text-center" type="submit" onClick={handleFinish}>Pay <FaRupeeSign className='text-xl mt-1 text-center'/>{totalPrice}</button>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Order
