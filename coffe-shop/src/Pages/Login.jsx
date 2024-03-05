import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import logo from "../assets/logo.png";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // const token = localStorage.getItem("token");
        // if (token) {
        //     // If the user is already logged in, redirect them to another page
        //     navigate("/");
        // }
    }, []);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const userData = { email, password };

        fetch("http://localhost:8000/api/v1/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Response data:", data); // Log the response data for debugging
                if (data.success) {
                    localStorage.setItem("token", data.data.token);
                    toast.success(data.message);
                    navigate("/");
                } else {
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                console.error("Login error:", error); // Log any errors
                toast.error("An error occurred while logging in.");
            });
    };

    return (
        <div className="login">
            <div className=" h-screen pt-[16vh]">
                <form className=" ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5" onSubmit={handleOnSubmit}>
                    <NavLink to="/">
                        <img src={logo} alt="" className="logo mb-6 cursor-pointer text-center h-[110px]" />
                    </NavLink>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2" htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter your email" name="email" className=" shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2" htmlFor="email">Password</label>
                        <input type="password" placeholder="**********" name="password" className=" shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <button className=" bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center" type="submit">Sign In</button>
                    <NavLink className=" text-[#fdc55e] text-center font-semibold w-full mb-3 py-2 px-4 rounded" to="/register">Create an Account</NavLink>
                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}

export default Login;


// import React from 'react'
// import logo from "../assets/logo.png"
// import { NavLink, useNavigate } from 'react-router-dom'
// import "react-toastify/dist/ReactToastify.css";
// import { toast, ToastContainer } from "react-toastify";


// const Login = () => {

//     const navigate = useNavigate();



//     const handleOnSubmit = async (e) => {
//         e.preventDefault();
//         const form = e.target;
//         const email = form.email.value;
//         const password = form.password.value;
//         const userData = { email, password };
    
//         fetch("http://localhost:8000/api/v1/user/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(userData),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log("Response data:", data); // Log the response data for debugging
//                 if (data.success) {
//                     localStorage.setItem("token", data.data.token);
//                     toast.success(data.message);
//                     navigate("/");
//                 } else {
//                     toast.error(data.message);
//                 }
//             })
//             .catch((error) => {
//                 console.error("Login error:", error); // Log any errors
//                 toast.error("An error occurred while logging in.");
//             });
//     };
    
//     return (
//         <div className="login">
//             <div className=" h-screen pt-[16vh]">
//                 <form className=" ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5" onSubmit={handleOnSubmit}>
//                     <NavLink to="/">
//                         <img src={logo} alt="" className="logo mb-6 cursor-pointer text-center h-[110px]" />
//                     </NavLink>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm mb-2" htmlFor="email">Email</label>
//                         <input type="email" placeholder="Enter your email" name="email" className=" shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm mb-2" htmlFor="email">Password</label>
//                         <input type="password" placeholder="**********" name="password" className=" shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                     </div>
//                     <button className=" bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center" type="submit">Sign In</button>
//                     <a className=" text-[#fdc55e] text-center font-semibold w-full mb-3 py-2 px-4 rounded" href="/register">Create an Account</a>
//                     <ToastContainer />
//                 </form>
//             </div>
//         </div>
//     )

// }

// export default Login