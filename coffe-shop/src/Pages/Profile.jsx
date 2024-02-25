import React, { useState } from 'react'
// import { ToastContainer } from 'react-toastify'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from '../../context/userContext';


const Profile = () => {

    const [image, setImage] = useState({});
    const [uploading, setUploading] = useState(false);
    const { user, setUser } = useUserContext();
    const navigate=useNavigate()

    const handleImage = async (e) => {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append("image", file);
        setUploading(true);
        try {
            const { data } = await axios.post(
                "http://localhost:8000/api/v1/all/upload-image",
                formData
            );
            setUploading(false);
            setImage({
                url: data.url,
                public_id: data.public_id,
            });
        } catch (error) {
            console.log(error);
        }
    };


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const country = form.country.value;
        const city = form.city.value;
        const state = form.state.value;
        const zipCode = form.zipCode.value;
        const profileImage = image?.url;

        try {
            const token = localStorage.getItem("token");
            if (token) {
                const res = await axios.put(
                    "http://localhost:8000/api/v1/user/update", {
                    userId: user.user._id,
                    name,
                    country,
                    city,
                    state,
                    zipCode,
                    profileImage,
                    
                    // headers: {
                    //     Authorization: `Bearer ${token}`
                    // }
                }
                );
                if (res.data.success) {
                    toast.success(res.data.message);
                    form.reset();
                    navigate("/");
                } else {
                    toast.error(data.message);

                }
            }
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div className='profile'>
            <div class="w-full mx-auto pt-[16vh]">
                <form
                    class=" ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5" onSubmit={handleOnSubmit}>
                    <label for="file-upload" class="custom-file-upload">
                        <img src={user?.user?.profileImage} alt="" class="h-32 w-32 bg-contain rounded-full mx-auto cursor-pointer" />
                    </label>
                    <label class="block text-center text-gray-900 text-base mb-2">
                        Profile Picture
                    </label>
                    <input type="file" label="Image" onChange={handleImage} name="myFile" id="file-upload" class="hidden" accept=" .jpeg, .png, .jpg" />
                    <div class="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">


                        <input type="text" placeholder={user?.user?.name} name="name" class="input input-bordered shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                        <input type="email" placeholder={user?.user?.email} name="email" class=" shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                        <input type="text" placeholder={user?.user?.country || "Country"} name="country" class=" shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                        <input type="text" placeholder={user?.user?.city || "City"} name="city" class=" shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                        <input type="text" placeholder={user?.user?.state || "State"} name="state" class=" shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                        <input type="text" placeholder={user?.user?.zipCode || "zipCode"} name="zipCode" class=" shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        {/* 
                        <input type="Number" placeholder="Enter Weight" name="weight" class=" shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                        <input type="text" placeholder="Enter Location" name="location" class=" shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /> */}

                        {/* <textarea name='description' className="textarea col-span-2 textarea-ghost  shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Description"></textarea> */}
                    </div>


                    <button class=" bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5" type="submit"> Update Profile</button>

                    <ToastContainer />

                </form>
            </div>
        </div>
    )
}

export default Profile
