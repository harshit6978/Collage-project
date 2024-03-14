import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';

const DeleteFood = () => {
    const [foodDetails, setFoodDetails] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [totalCost, setTotalCost] = useState(0);

    const categories = [
        { id: 0, name: 'All', value: 'all' },
        { id: 1, name: 'Frappuccino', value: 'Frappuccino' },
        { id: 2, name: 'Desert', value: 'Desert' },
        { id: 3, name: 'Late', value: 'Late' },
        { id: 4, name: 'Tonic Base', value: 'Tonic Base' },
        { id: 5, name: 'Shakes', value: 'Shakes' },
        { id: 6, name: 'Mojito', value: 'Mojito' },
        { id: 7, name: 'Hot Chocolate', value: 'Hot Chocolate' },
        { id: 8, name: 'Juice', value: 'Juice' },
    ];

    const handleCategoryChange = (category) => {
        setActiveCategory(category.value);
    };

    const getFoods = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/food/getAllFoods?category=${activeCategory}`);
            if (res.data.success) {
                setFoodDetails(res.data.data.food);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const delet = async (id, price) => { // Modify to accept price as an argument
        if (Swal) {
            try {
                const result = await Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                });

                if (result.isConfirmed) {
                    const response = await axios.delete(`http://localhost:8000/api/v1/food/deleteFood/${id}`);
                    if (response.status === 200 && response.data.success === true) {
                        setFoodDetails(foodDetails.filter(item => item._id !== id));
                        setTotalCost(totalCost + price); // Increase total cost when deleting an item
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        getFoods();
    }

    const updateFood = async (id, name, price, qty) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/v1/food/updateFood/${id}`, {
                name: name,
                price: price,
                qty: qty
            });
            if (response.status === 200 && response.data.success === true) {
                setFoodDetails(foodDetails.map(item => item._id === id ? { ...item, name: name, price: price } : item));
                Swal.fire({
                    title: "Updated!",
                    text: "Food details have been updated.",
                    icon: "success"
                });
            }
        } catch (err) {
            console.log(err);
        }
        getFoods()
    }

    const handleUpdate = (id, newName, newPrice, newQty) => {
        updateFood(id, newName, newPrice, newQty);
    }

    const handleNameChange = (id, newName) => {
        setFoodDetails(foodDetails.map(item => item._id === id ? { ...item, name: newName } : item));
    }

    const handlePriceChange = (id, newPrice) => {
        setFoodDetails(foodDetails.map(item => item._id === id ? { ...item, price: newPrice } : item));
    }

    const handleQtyChange = (id, newQty) => {
        setFoodDetails(foodDetails.map(item => item._id === id ? { ...item, qty: newQty } : item));
    }

    useEffect(() => {
        getFoods();
    }, [activeCategory]);

    return (
        <>
            <div className=" mt-40">
                <div className="flex flex-wrap justify-center">
                    {categories.map(category => (
                        <button key={category.id} onClick={() => handleCategoryChange(category)} className={`text-xl px-4  py-3 text-center  text-red-500 hover:bg-red-500 hover:text-white border-red-500 border-2 rounded-lg m-2 bg-transparent justify-center font-medium ${activeCategory === category.value ? '' : ''}`}>
                            {category.name}
                        </button>
                    ))}
                </div>
                <table className="table">
                    <tbody>
                        <div class="flex flex-col">
                            <div class="-m-1.5 ">
                                <div class="p-1.5 min-w-full inline-block align-middle">
                                    <div class="overflow-hidden">
                                        <table class="min-w-full mt-14 divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Name</th>
                                                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Profile</th>
                                                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Price</th>
                                                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Category</th>
                                                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">quantity</th>
                                                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Weight</th>
                                                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                                                </tr>
                                            </thead>
                                            {
                                                foodDetails.map((item, index) => (
                                                    <tbody key={index} class="divide-y divide-gray-200 dark:divide-gray-700">
                                                        <tr>
                                                            <input className='px-6 py-4 mt-4 whitespace-nowrap text-lg rounded-3xl text-gray-800 bg-[#ee7b761f] ml-5' value={item?.name} onChange={(e) => handleNameChange(item._id, e.target.value)} />
                                                            <td><img src={item?.foodImage} className='cursor-pointer mask mask-squircle w-16 h-16'></img></td>
                                                            <input className='px-6 py-4 mt-4 whitespace-nowrap text-lg text-gray-800 rounded-3xl bg-[#ee7b761f] bg-red-600; ' value={item?.price} onChange={(e) => handlePriceChange(item._id, e.target.value)} />
                                                            <td class="px-6 py-4 whitespace-nowrap text-lg text-gray-800 ">{item?.catagory}</td>
                                                            <td><input className='px-6 py-4 mt-4 whitespace-nowrap text-lg text-gray-800 rounded-3xl bg-[#ee7b761f] ml-3 bg-red-600;' value={item?.qty} onChange={(e) => handleQtyChange(item._id, e.target.value)} /></td>
                                                            <td class="px-6 py-4 whitespace-nowrap text-lg text-gray-800 ">{item.weight}</td>
                                                            <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                <button class="bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-5 py-2 text-xl font-medium text-white mr-3" onClick={() => handleUpdate(item._id, item.name, item.price, item.qty)}>Update</button>
                                                                <button class="bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-5 py-2 text-xl font-medium text-white" onClick={() => delet(item._id, item.price)}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                ))
                                            }
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DeleteFood;
