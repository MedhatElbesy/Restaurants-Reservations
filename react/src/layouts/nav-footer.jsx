import React from 'react'
import MyNavbar from './nav/My-navbar'
import Footer from './footer/Footer'

export default function NavFooter({children}) {
  return (
    <>
      <MyNavbar></MyNavbar>
      {children}
      <Footer></Footer>
      
    </>
  )
}
