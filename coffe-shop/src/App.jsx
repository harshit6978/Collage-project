import { useState } from 'react'
import './App.css'
import Navbar from './Shared/Navbar'
import Home from './Pages/Home'
import Footer from './Shared/Footer'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ProtectedRoute from './Pages/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
