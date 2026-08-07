import React, { useEffect } from 'react'
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const MainLayout = () => {

  const mode = useSelector((state) => state.theme.mode)

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      mode === "dark"
    )
  }, [mode])
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout