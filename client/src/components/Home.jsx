import React from "react";
import HeroSection from "./Home/HeroSection";
import classes from "./Home.module.css"; // Ana sayfanın tümüne özel stil dosyası
import JourneySection from "./Home/JourneySection";
import ServicesSection from "./Home/ServiceSection";
import PlanYourTrip from "./Home/PlanyourTrip";
import Testimonials from "./Home/Testimonails";

function Home() {
    return (
        <div className={classes.homeContainer}>
            <HeroSection />
            <JourneySection/>
            <ServicesSection/>
            <PlanYourTrip/>
            <Testimonials/>
        </div>
    );
}

export default Home;
