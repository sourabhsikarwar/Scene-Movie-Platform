import React from "react";
import Banner from "../components/Banner/Banner";
import Trending from "../components/Carousel/Trending";

const Home = () => {
  return (
    <div>
      <Banner/>
      <Trending />
      <Trending title="TV Shows"/>
      <Trending title="Action"/>
      <Trending title="Drama"/>
      <Trending title="Thriller"/>
      <Trending title="Romance"/>
      <Trending title="Comedy"/>
    </div>
  );
};

export default Home;
