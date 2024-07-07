import CustomCarousel from "./CustomCarousel";
import NearRestau from "./near-restaurants/NearRestau";
// import TopRestau from "./top-rated/TopRestau";
import NavFooter from "../../layouts/nav-footer";
import StaticCard from "./static-card/StaticCard";
import Card from "./flex-cards/Card";
import AllRestaurants from "./get-all-restaurants/AllRestaurants";
import Circles from "./circles/Circles";
import { decryptData } from "../../helpers/cryptoUtils";

export default function Home() {
  console.log(decryptData("token"));
  return (
    <>
      <NavFooter>
        <CustomCarousel></CustomCarousel>
        <NearRestau></NearRestau>
        <Circles></Circles>
        <AllRestaurants/>
        <StaticCard></StaticCard>
        {/* <TopRestau></TopRestau> */}
        <Card></Card>
      </NavFooter>
    </>
  );
}
