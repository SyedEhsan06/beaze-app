 "use client"
 import { usePathname } from "next/navigation";
import Copyright from "./Copyright";
import Footermenu from "./Footermenu";
import Sociallinks from "./Sociallinks";


export default function footer() {
  const pathname = usePathname();
  console.log(pathname);
  if (pathname == "/login" || pathname == "/signup") {
    return null;
  }
  else{
    return (
      <footer>
       <Sociallinks/>
       <Footermenu/>
       <Copyright/>
      </footer>
     )
  }
}
