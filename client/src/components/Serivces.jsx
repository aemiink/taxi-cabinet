import Cars from "./Services/Cars";
import Drivers from "./Services/Drivers";
import HeroSection from "./Services/HeroSection";

function Services() {
    return(
        <div>
            <HeroSection/>
            <Drivers/>
            <Cars/>
        </div>
    )
}

export default Services;