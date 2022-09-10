import React from "react";
import Banner from "../components/Banner/Banner";
import Trending from "../components/Carousel/Trending";
import TvCarousel from "../components/Carousel/TvCarousel";

const Home = () => {
  return (
    <div>
      <Banner/>
      <Trending />
      <Trending title="TV Shows"/>
      <Trending title="Action"/>
      <TvCarousel title="Trending"/>
      <Trending title="Drama"/>
      <Trending title="Thriller"/>
      <Trending title="Romance"/>
      <Trending title="Comedy"/>
    </div>
  );
};

export default Home;
