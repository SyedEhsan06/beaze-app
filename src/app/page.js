
import Features from "@/components/home/homecontent/Features";
import Offerbanner from "@/components/home/homecontent/Offerbanner";
import Productslider from "@/components/home/homecontent/Productslider";
import { featuresdata } from "@/utils/dummydata";

export default function page() {
    return (
      <div className="grid grid-cols-1 gap-y-10 my-10 px-3">
        <Features/>
       <Productslider/>
       <Offerbanner/>
      </div>
    )
}
