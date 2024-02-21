// import React, { useEffect } from 'react'
// import { useUserContext } from '../../context/userContext'
// import axios from "axios"
// import { Navigate } from 'react-router-dom'
// export default function ProtectedRoute({ children }) {
//     const { user, setUser } = useUserContext()

//     const getUser = async () => {
//         try {
//             const res = await axios.get(
//                 "http://localhost:8000/api/v1/user/get-user", {
//                 token: localStorage.getItem("token")
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`
//                 }
//             }
//             )
//             if (res.data.success) {
//                 setUser(res.data.data)
//             } else {
//                 <Navigate to="/login" />
//                 localStorage.clear()
//             }
//         } catch (error) {
//             localStorage.clear()
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         if (!user) {
//             getUser()
//         }
//     }, [user])

//     if (localStorage.getItem("token")) {
//         return children
//     } else {
//         return <Navigate to="/login" />
//     }
// }

import React, { useEffect } from 'react';
import { useUserContext } from '../../context/userContext';
import axios from "axios";
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const { user, setUser } = useUserContext();

    const getUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const res = await axios.get(
                    "http://localhost:8000/api/v1/user/get-user", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (res.data.success) {
                    setUser(res.data.data);
                } else {
                    // localStorage.clear();
                }
            }
        } catch (error) {
            localStorage.clear();
            console.log(error);
        }
    };
    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [user, setUser]);

    if (localStorage.getItem("token")) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}
