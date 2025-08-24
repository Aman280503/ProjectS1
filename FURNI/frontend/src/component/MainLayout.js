import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../pages/Header'
import Footer from '../pages/Footer'
import WishlistSlider from './WishlistSlider';
const MainLayout = () => {
  return (
    <div>
      <Header />
      <WishlistSlider />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout