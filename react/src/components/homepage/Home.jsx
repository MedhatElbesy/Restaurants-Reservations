import React from 'react'
import'./CustomCarousel.css'
import CustomCarousel from './CustomCarousel'
import AllRestaurants from './get-all-restaurants/AllRestaurants'
import StaticCard from './static-card/StaticCard'
import TopRestau from './top-rated/TopRestau'
import NearRestau from './near-restaurants/NearRestau'
import Footer from '../../layouts/footer/Footer'
import Circles from './circles/Circles'

export default function Home() {
  return (
    <main className=' home'>
      
      <CustomCarousel></CustomCarousel>
      <AllRestaurants ></AllRestaurants>
  <Circles></Circles>
 
      <TopRestau></TopRestau>

      <NearRestau></NearRestau>
     
      <Footer></Footer>

    
    </main>
  )
}
