import React, { useEffect } from 'react'
import'./CustomCarousel.css'
import CustomCarousel from './CustomCarousel'
import AllRestaurants from './get-all-restaurants/AllRestaurants'
import StaticCard from './static-card/StaticCard'
import TopRestau from './top-rated/TopRestau'
import NearRestau from './near-restaurants/NearRestau'
import Footer from '../../layouts/footer/Footer'
import Circles from './circles/Circles'
import Loader from '../../layouts/loader/loader'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRestaurants } from '../../slices/adminDashboard/adminSlice'

export default function Home() {
  
  const dispatch = useDispatch();
  const { restaurants, status } = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <main className=' home'>
      
      <CustomCarousel></CustomCarousel>
      <AllRestaurants restaurants={restaurants} ></AllRestaurants>
  <Circles></Circles>
 
      <TopRestau></TopRestau>

      <NearRestau></NearRestau>
     
      <Footer></Footer>

    
    </main>
  )
}
