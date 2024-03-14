import './App.css'
import Navbar from './Shared/Navbar'
import Home from './Pages/Home'
import Footer from './Shared/Footer'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ProtectedRoute from './Pages/ProtectedRoute'
import VerifyOtp from './Pages/VerifyOtp'
import Addfood from './Pages/Addfood'
import Menu from './Pages/Menu'
import FoodPage from './Pages/FoodPage'
import Profile from './Pages/Profile'
import DeleteFood from "./Pages/DeleteFood";
import ViewCart from './Pages/ViewCart'
import Success from './Pages/Success'
import Cancel from './Pages/Cancel'
import Order from './Pages/Order'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import MyOrder from './Pages/MyOrder'
import AboutUs from './Pages/AboutUs'
import Contactus from './Pages/Contactus'
import UserOrder from './Pages/UserOrder'
import Favorite from './Pages/Favorite'

function App() {
  const [count, setcount] = useState(0)
  const stripePromise = loadStripe(
    'pk_test_51OnaOiSISq8QzUEd8aHdJGMzxIqOe0S6GpXMuJaFJZBfFYXxNwAyz35sj1G35jLzCz4dzFd8y7owX0b7BF7mWKIJ00NoDwW1rY'
  )

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route path="/contactus" element={<Contactus />}></Route>
        <Route path="/verifyOtp" element={<VerifyOtp />}></Route>
        <Route path="/addfood" element={<ProtectedRoute><Addfood /></ProtectedRoute>}></Route>
        <Route path="/favorite" element={<ProtectedRoute><Favorite /></ProtectedRoute>}></Route>
        <Route path='/menu' element={<ProtectedRoute><Menu /></ProtectedRoute>}></Route>
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
        <Route path='/menu/:id' element={<ProtectedRoute><FoodPage /></ProtectedRoute>}></Route>
        <Route exact path='/foodDelete' element={<ProtectedRoute><DeleteFood /></ProtectedRoute>}></Route>
        <Route exact path='/viewcart' element={<ProtectedRoute><ViewCart /></ProtectedRoute>}></Route>
        <Route exact path='/success' element={<ProtectedRoute><Success /></ProtectedRoute>}></Route>
        <Route exact path='/cancel' element={<ProtectedRoute><Cancel /></ProtectedRoute>}></Route>
        <Route exact path='/myorder' element={<ProtectedRoute><MyOrder /></ProtectedRoute>}></Route>
        <Route exact path='/userorder' element={<ProtectedRoute><UserOrder /></ProtectedRoute>}></Route>
        <Route exact path='/order' element={<ProtectedRoute>
          <Elements stripe={stripePromise}>
            <Order />
          </Elements>
        </ProtectedRoute>}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
