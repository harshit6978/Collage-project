import React, { useEffect, useState } from 'react';
import { useCartContext } from '../../context/cartContext';
import { useUserContext } from '../../context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import axios from 'axios';
import { FaRegWindowClose } from 'react-icons/fa';

const UserOrder = () => {
    const { user } = useUserContext();
    const [orders, setOrders] = useState([]);

    const getAllOrders = async () => {
        try {
            const res = await axios.post(
                'http://localhost:8000/api/v1/order/getorders',
                {
                    userId: user?.user._id,
                    token: localStorage.getItem('token')
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (res.data.success) {
                setOrders(res.data.data);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            const res = await axios.delete(
                `http://localhost:8000/api/v1/order/delete/${orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (res.data.success) {
                setOrders(orders.filter(order => order._id !== orderId));
                toast.success('Order deleted successfully');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    // console.log(orders, "00000000000000000000");
    return (
        <div>
            <div className='pt-24'>
                <div className='container mx-auto py-6'>
                    <div className='w-full bg-white px-10 py-5 text-black rounded-md'>
                        <div className='flex justify-between border-b pb-8'>
                            <h1 className='font-semibold text-2xl'>
                                My Order Detail
                            </h1>
                        </div>


                        {orders.map((order) => (
                            order.user.email === user.user.email && (
                                <CartFood key={order._id} order={order} onDelete={handleDeleteOrder} />
                            )

                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartFood = ({ order, onDelete }) => {
    const { user } = useUserContext();
    // console.log(user.user.email, "ooo");


    const paymentStatus = order?.payment ? 'Paid' : 'Not Paid';
    const handleDelete = async () => {
        try {
            await onDelete(order._id);
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <div className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'>
            <div className='flex w-2/5'>
                <div className='grid grid-cols-3'>
                    {order && order.items && order.items.map((item) => (
                        <div key={item._id} className='flex flex-col justify-between ml-4 flex-grow'>
                            <div>
                                {item.food && item.food.foodImage && (
                                    <img src={item.food.foodImage} alt='' className='h-20' />
                                )}
                            </div>
                            <span className='font-bold text-sm'>
                                {item.food ? item.food.name : 'Unknown Food'}
                            </span>
                            <span className='flex items-center space-x-4'>
                                qty:
                                <span className='text-red-500 px-3 py-2 bg-slate-50 text-lg font-medium'>
                                    {item.qty}
                                </span>

                            </span>
                        </div>
                    ))}

                </div>
            </div>

            <div className='flex justify-center w-1/5 cursor-pointer'>
                <span className={`font-bold text-sm ${order?.payment ? 'text-green-600' : 'text-red-500'}`}>
                    {paymentStatus}
                </span>
            </div>
            <div className='flex justify-center w-1/5 cursor-pointer'>
                <span className='font-bold text-sm'>{order?.status}</span>
            </div>

            {/* <span className='font-bold text-center w-1/5 text-sm'>{order?.createdAt}</span> */}
            <span className='font-bold text-sm w-[34%] text-center'>{order?.totalAmount}</span>
            {order.user && (
                <span className="font-bold text-sm">{order.user.email}</span>
            )}
            <button onClick={handleDelete} className="ml-5 text-4xl"><FaRegWindowClose /></button>

            <ToastContainer />
        </div>
    );
};


export default UserOrder;
