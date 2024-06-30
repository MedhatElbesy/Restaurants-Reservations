import React from "react";
import CustomCarousel from "./CustomCarousel";
import NearRestau from "./near-restaurants/NearRestau";
import TopRestau from "./top-rated/TopRestau";
import NavFooter from "../../layouts/nav-footer";
import StaticCard from "./static-card/StaticCard";
import Card from "./flex-cards/Card";

export default function Home() {
  return (
    <>
      <NavFooter>
        <CustomCarousel></CustomCarousel>
        <NearRestau></NearRestau>
        <StaticCard></StaticCard>
        <TopRestau></TopRestau>
        <Card></Card>
      </NavFooter>
    </>
  );
}
