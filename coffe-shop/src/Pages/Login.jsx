import React from 'react'
import logo from "../assets/logo.png"
import { NavLink } from 'react-router-dom'
const Login = () => {
    return (
        <div class="login">
            <div class=" h-screen pt-[16vh]">
                <form class=" ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5">
                    <NavLink to="/">
                        <img src={logo} alt="" class="logo mb-6 cursor-pointer text-center h-[110px]" />
                    </NavLink>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm mb-2" for="email">Email</label>
                        <input type="email" placeholder="Enter your email" name="email" class=" shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm mb-2" for="email">Password</label>
                        <input type="password" placeholder="**********" name="password" class=" shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <button class=" bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center" type="submit">Sign In</button>
                    <a class=" text-[#fdc55e] text-center font-semibold w-full mb-3 py-2 px-4 rounded" href="/register">Create an Account</a>
                    <div class="Toastify">

                    </div>
                </form>
            </div>
        </div>
    )

}

export default Login