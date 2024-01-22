
import Homebanner from "@/components/home/banner/Homebanner";
import Features from "@/components/home/homecontent/Features";
import Offerbanner from "@/components/home/homecontent/Offerbanner";
import Productslider from "@/components/home/homecontent/Productslider";
import Ratings from "@/components/home/homecontent/Ratings";
import Teazeslider from "@/components/home/homecontent/Teazeslider";
import { featuresdata } from "@/utils/dummydata";
import React from "react";

export default function page() {
    return (
     <React.Fragment>
        <Homebanner/>
        <div className="grid grid-cols-1 mt-10 ">
            <Features />
            <Productslider />
            <Offerbanner />
            <Teazeslider/>
            <Ratings/>
        </div>
     </React.Fragment>
    )
}
