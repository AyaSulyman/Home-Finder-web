import React from "react";
import Header from "../property-details/Header/Header";
import Hero from "./Hero/Hero";
import Categories from "./Categories/Categories";
import FeaturedHomes from "./FeaturedHomes/FeaturedHomes";
import HowItWorks from "./HowItWorks/HowItWorks";
import SellerBanner from "./SellerBanner/SellerBanner";
import FeaturedProperties from "./FeaturedProperties/FeaturedProperties";
import Footer from "./Footer/Footer";

const Home: React.FC = () => {
  return (
    <>
      <Header active="home" />
      <Hero />
      <Categories />
      <FeaturedHomes />
      <HowItWorks />
      <SellerBanner />
      <FeaturedProperties />
      <Footer />
    </>
  );
};

export default Home;