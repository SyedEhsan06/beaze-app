
import Homebanner from "@/components/home/banner/Homebanner";

import Homemain from "@/components/home/homecontent/Homemain";
import React from "react";

export default function page() {
    return (
     <React.Fragment>
        <Homebanner/>
        <div className="grid grid-cols-1 mt-10 overflow-x-hidden ">
         <Homemain/>
        </div>
     </React.Fragment>
    )
}
