import React, { useEffect, useState } from 'react'
import axios from "axios";
import Swal from "sweetalert2"
import { useParams } from 'react-router-dom';
const DeleteFood = () => {

    // const params = useParams();
    const [foodDetails, setFoodDetails] = useState([])
    const [activeCategory, setActiveCategory] = useState('all');

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

    const delet = async (id) => {
        // let confirmDelete = window.confirm("Are you sure to delete this food?");

        if (Swal) {
            try {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        })
                        const response = axios.delete(`http://localhost:8000/api/v1/food/deleteFood/${id}`);
                        if (response.status === 200 && response.data.success === true) {
                            setFoodDetails(foodDetails.filter(item => item._id !== id));
                        }
                    }
                    
                });
            } catch (err) {
                console.log(err);
            }
        }
        return confirmDelete;
    }


    const updateFood = async (id, name, price) => {
        try {
            // Make API call to update food details
            const response = await axios.put(`http://localhost:8000/api/v1/food/updateFood/${id}`, {
                name: name,
                price: price
            });
            if (response.status === 200 && response.data.success === true) {
                // Update the food details in the state
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
    }

    const handleUpdate = (id, newName, newPrice) => {
        updateFood(id, newName, newPrice);
    }

    const handleNameChange = (id, newName) => {
        setFoodDetails(foodDetails.map(item => item._id === id ? { ...item, name: newName } : item));
    }

    const handlePriceChange = (id, newPrice) => {
        setFoodDetails(foodDetails.map(item => item._id === id ? { ...item, price: newPrice } : item));
    }







    // console.log(foodDetails, "delete");
    useEffect(() => {
        // getFoodDetails()
        getFoods()
    }, [activeCategory])


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
                                            {/* <caption class="py-2 text-start text-sm text-gray-600 dark:text-gray-500">List of users</caption> */}
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                                                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Profile</th>
                                                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">price</th>
                                                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">category</th>
                                                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Weight</th>
                                                    {/* <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Address</th> */}
                                                    <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                                                </tr>
                                            </thead>
                                            {
                                                foodDetails.map((item, index) => (
                                                    <>
                                                        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                                            <tr>
                                                                <input className='px-6 py-4 mt-4 whitespace-nowrap text-lg rounded-3xl text-gray-800 bg-[#ee7b761f]' value={item?.name} onChange={(e) => handleNameChange(item._id, e.target.value)} />
                                                                <td><img src={item?.foodImage} className='cursor-pointer mask mask-squircle w-16 h-16'></img></td>
                                                                {/* <td class="">{item?.price}</td> */}
                                                                <input className='px-6 py-4 mt-4 whitespace-nowrap text-lg text-gray-800 rounded-3xl bg-[#ee7b761f] bg-red-600; ' value={item?.price} onChange={(e) => handlePriceChange(item._id, e.target.value)} />
                                                                <td class="px-6 py-4 whitespace-nowrap text-lg text-gray-800 ">{item.catagory}</td>
                                                                <td class="px-6 py-4 whitespace-nowrap text-lg text-gray-800 ">{item.weight}</td>
                                                                <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                    <button class="bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-5 py-2 text-xl font-medium text-white mr-3" onClick={() => handleUpdate(item._id, item.name, item.price)}>update</button>
                                                                    <button class="bg-[#f54748] active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-5 py-2 text-xl font-medium text-white" onClick={() => delet(item._id)}>delete</button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </>
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
    )
}

export default DeleteFood