import React from "react";
import HeroSection from "./Home/HeroSection";
import classes from "./Home.module.css"; // Ana sayfanın tümüne özel stil dosyası

function Home() {
    return (
        <div className={classes.homeContainer}>
            <HeroSection />
        </div>
    );
}

export default Home;
