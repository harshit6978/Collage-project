import { useState } from 'react'
import './App.css'
import Navbar from './Shared/Navbar'
import Home from './Pages/Home'
import Footer from './Shared/Footer'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ProtectedRoute from './Pages/ProtectedRoute'
import VerifyOtp from './Pages/VerifyOtp'
import Addfood from './Pages/Addfood'
import Menu from './Pages/Menu'
import FoodPage from './Pages/FoodPage'
import Profile from './Pages/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/verifyOtp" element={<VerifyOtp />}></Route>
        <Route path="/addfood" element={<ProtectedRoute><Addfood /></ProtectedRoute>}></Route>
        <Route path='/menu' element={<ProtectedRoute><Menu /></ProtectedRoute>}></Route>
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
        <Route path='/menu/:id' element={<ProtectedRoute><FoodPage /></ProtectedRoute>}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
