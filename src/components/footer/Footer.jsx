 "use client"
 import { usePathname } from "next/navigation";
import Copyright from "./Copyright";
import Footermenu from "./Footermenu";
import Sociallinks from "./Sociallinks";
import { useSelector } from "react-redux";
import { selectCategories } from "@/redux/slices/categorySlice";


export default function footer() {
  const pathname = usePathname();
  const categrories = useSelector(selectCategories);
  let cats = categrories?.categories
  if (pathname == "/login" || pathname == "/signup" || pathname === "/otp") {
    return null;
  } 

  else{
    return (
      <footer>
       <Footermenu categrories={cats} />
       <Copyright/>
      </footer>
     )
  }
}
