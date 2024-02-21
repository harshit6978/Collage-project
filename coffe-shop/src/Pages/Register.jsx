import React, { useState } from "react";
import profile from "../assets/profile.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
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
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confrimPassword = form.confrimPassword.value;
    const profileImage = image?.url;
    const userData = { name, email, password, confrimPassword, profileImage };
    console.log("??????????????????????????????????????????", userData);
    fetch("http://localhost:8000/api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.data.token),
            toast.success(data.message);
          form.reset();
          navigate("/");
          console.log(data, "dssd");
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div class="register">
      <div class="w-full mx-auto pt-[16vh]">
        <form
          class=" ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5"
          onSubmit={handleOnSubmit}
        >
          <label for="file-upload" class="custom-file-upload">
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
          />
          <div class="mb-3">
            <label class="block text-gray-700 text-sm mb-2" for="name">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              name="name"
              class=" shadow-sm bg-white appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="mb-3">
            <label class="block text-gray-700 text-sm mb-2" for="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              class=" shadow-sm bg-white appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div class="flex flex-col md:flex-row md:gap-4">
            <div class="mb-3">
              <label class="block text-gray-700 text-sm mb-2">Password</label>
              <input
                type="password"
                placeholder="**********"
                name="password"
                class=" shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="mb-3">
              <label class="block text-gray-700 text-sm mb-2">
                Confrim Password
              </label>
              <input
                type="password"
                placeholder="**********"
                name="confrimPassword"
                class=" shadow-sm bg-white appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <button
            class=" bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5"
            type="submit"
          >
            Register
          </button>
          <a
            class=" text-[#fdc55e] mx-auto text-center font-semibold  mb-3 py-2 px-4 rounded"
            href="/login"
          >
            Already Account
          </a>
          <ToastContainer />

        </form>
      </div>
    </div>
  );
};

export default Register;
