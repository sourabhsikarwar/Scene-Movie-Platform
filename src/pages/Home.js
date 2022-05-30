import React from "react";
// import Navbar from '../components/Navbar'
import Banner from "../components/Banner";
import Trending from "../components/Trending";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Banner />
      <Trending title="Trending"/>
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
