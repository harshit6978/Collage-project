import React, { useState } from 'react'
// import { ToastContainer } from 'react-toastify'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo from "../assets/logo.png"
import { NavLink } from 'react-router-dom';

const Addfood = () => {


  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

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
      if (uploading === false) {
        toast.success("Successfully uploaded")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const price = form.price.value;
    const catagory = form.catagory.value;
    const weight = form.weight.value;
    const location = form.location.value;
    const description = form.description.value;
    const foodImage = image?.url;
    const foodData = { name, price, catagory, weight, location, description, foodImage };

    const res = await axios.post("http://localhost:8000/api/v1/food/addfood", { name, price, catagory, weight, location, description, foodImage  }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (res.data.success) {
      toast.success(res.data.message)
    } else {
      toast.error(res.data.message)
    }
  }


  return (
    <div className='addfood'>
      <div class="w-full mx-auto pt-[16vh]">
        <form className=" ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5" onSubmit={handleSubmit}>
          {/* <label for="file-upload" class="custom-file-upload">
            <img
              src={image?.url || profile}
              alt=""
              class="h-32 w-32 bg-contain rounded-full mx-auto cursor-pointer"
            />
          </label>
          <label class="block text-center text-gray-900 text-base mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            label="Image"
            onChange={handleImage}
            name="myFile"
            id="file-upload"
            class="hidden"
            accept=" .jpeg, .png, .jpg"
          /> */}

          <NavLink to="/">
            <img src={logo} alt="" className="logo mx-auto mb-6 cursor-pointer text-center h-[110px]" />
          </NavLink>


          <div class="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">


            <input type="text" placeholder="Enter Food Name" name="name" class="input input-bordered shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

            <input type="file" name='myFile' accept=" .jpeg, .png, .jpg" className="file-input  bg-red-500 file-input-md text-white file-input-bordered w-full max-w-xs" onChange={handleImage} />

            <input type="Number" placeholder="Enter Price" name="price" class=" shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

            <select className="select bg-red-500 text-white select-md w-full max-w-xs" name='catagory'>
              <option disabled selected>Catagory</option>
              <option>Rice</option>
              <option>Desert</option>
              <option>Drinks</option>
              <option>Fruits</option>
              <option>Pizza</option>
            </select>

            <input type="Number" placeholder="Enter Weight" name="weight" class=" shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

            <input type="text" placeholder="Enter Location" name="location" class=" shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

            <textarea name='description' className="textarea col-span-2 textarea-ghost  shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Description"></textarea>
          </div>


          <button
            class=" bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5"
            type="submit"
          >
            Add food
          </button>

          <ToastContainer />

        </form>
      </div>
    </div>
  )
}

export default Addfood