import React, { useEffect, useState } from 'react';
import { useCartContext } from '../../context/cartContext';
import { useUserContext } from '../../context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const AllOrder = () => {
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
    useEffect(() => {
        getAllOrders();
    }, []);

    console.log(user, "00000000000000000000");
    return (
        <div>
            <div className='pt-24'>
                <div className='container mx-auto py-6'>
                    <div className='w-full bg-white px-10 py-5 text-black rounded-md'>
                        <div className='flex justify-between border-b pb-8'>
                            <h1 className='font-semibold text-2xl'>
                                My Food Cart
                            </h1>
                        </div>

                        {orders.map((order) => (
                            <CartFood key={order._id} order={order} />
                        ))}

                        {/* {user.users.map((user) => (
                            <h1 key={user._id}>{user.name}</h1>
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartFood = ({ order }) => {
    const { user } = useUserContext();
    


    const handleDelivered = async (id) => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/order/deliverd', {
                userId: user?.user._id,
                orderId: id,
                token: localStorage.getItem('token')
            }, {
                headers: {
                    Authorization: `Bearer  ${localStorage.getItem("token")}`
                }
            })
            console.log(res.data, "id");
            if (res.data.success) {
                toast.success(res.data.message)
                
            } else {
                toast.error(res.data.message)

            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlePreparing = async (id) => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/order/preparing', {
                userId: user?.user._id,
                orderId: id,
                token: localStorage.getItem('token')
            }, {
                headers: {
                    Authorization: `Bearer  ${localStorage.getItem("token")}`
                }
            })
            // console.log(res.data, "id");
            if (res.data.success) {
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
            location.reload()
        } catch (error) {
            console.log(error);
        }
    }




    const paymentStatus = order?.payment ? 'Paid' : 'Not Paid';


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

            <div className='bg-[#f54748] active:scale-90 cursor-pointer mx-2 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white  text-center' onClick={() => handleDelivered(order?._id)}>
                Delivered
            </div>
            <div className='bg-[#f54748] active:scale-90 cursor-pointer mx-2 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white  text-center' onClick={() => handlePreparing(order?._id)}>
                Preparing
            </div>
            {/* <span className='font-bold text-center w-1/5 text-sm'>{order?.createdAt}</span> */}
            <span className='font-bold text-sm w-[34%] text-center'>{order?.totalAmount}</span>
            {order.user && (
                <>
                    <span className="font-bold text-sm">{order.user.email}</span>
                    {/* <span className="font-bold text-sm">{order.user.state}</span> */}
                </>
            )}

            <ToastContainer />
        </div>
    );
};


export default AllOrder;
