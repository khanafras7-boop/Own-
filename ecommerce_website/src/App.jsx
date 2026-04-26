import { useState } from 'react'
import './App.css'
import {Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Checkout from './pages/Checkout'
import Navbar from './components/Navbar'
import AuthProvider from './context/AuthContext'
import ProductDetails from './pages/ProductDetails'
function App() {
  

  return (
    
      <AuthProvider>
        <div className='app'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='*' element={<h1>404 not found</h1>} />
          </Routes>
        </div>
      </AuthProvider>
    
  )
}

export default App
