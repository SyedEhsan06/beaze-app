import { footerlinsk, footerlinkresgister, footerlinkshop, foooterlinkabout} from "@/utils/dummydata";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addSearch, toggleCategory, toggleCategoryCall, toggleSubcategory } from "@/redux/slices/filterSlice";
import cookieCutter from 'cookie-cutter'
import { useEffect,useState } from "react";

export default function Footermenu({
  categrories
}) {

  const [logdata,setlogdata] = useState(null)
  // console.log(categrories)
  // console.log(footerlinkshop)
  const dispatch = useDispatch();
  const handleDispatch = (item) => {
    // console.log("type", type, "item", item.subcategories.map((item) => item.name));
    dispatch(toggleSubcategory([]));
    dispatch(toggleCategory([]));
    dispatch(toggleCategoryCall([]));
    dispatch(addSearch(""));
    dispatch(toggleCategory(item.name));
    dispatch(toggleCategoryCall(item.name));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    let token = cookieCutter.get('token')
    setlogdata(token)
  },[])


  return (
    <div className=" py-12 px-4 md:px-10 lg:px-24 bg-theme-footer-bg  context ">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 md:justify-items-center ">
       <div>
       {
        footerlinkresgister.map((items, index) => (
            <div key={index} className="md:text-left text-center" >
              <h4 className="text-2xl text-white font-[700]">{items.heading}</h4>
              <ul className="">
              <li className="text-white text-opacity-[75%] transition-all duration-150 text-lg font-[400] mt-4 hover:text-opacity-[100%]"><Link href={'/signup'}>Create an account</Link></li>

              <li className="text-white text-opacity-[75%] transition-all duration-150 text-lg font-[400] mt-4 hover:text-opacity-[100%]" ><Link href={'/login'}>Sign in to your account</Link></li>

             {
              logdata ?  <li className="text-white text-opacity-[75%] transition-all duration-150 text-lg font-[400] mt-4 hover:text-opacity-[100%]" ><Link href={'/'}>See your past orders</Link></li> : null
             }

              <li className="text-white text-opacity-[75%] transition-all duration-150 text-lg font-[400] mt-4 hover:text-opacity-[100%]" ><Link href={'/signup'}>Sign up with us for discounts</Link></li>
              </ul>
              {
                items.logo && <Image src={items.logo} width={60} height={60} alt="logo" className="m-8"></Image>
              }

              {items.secondmenu && items.secondmenu.map((seconmenuitem, secondmenuindex) => (
                <div className="pt-4" key={secondmenuindex}>
                  <h4 className="text-2xl text-white font-[700] mt-4">{seconmenuitem.heading}</h4>
                  <ul className="">
                    {
                      seconmenuitem.menus.map((smenuitem, smenuindex) => (
                        <li className="text-white text-opacity-[75%] text-lg font-[400] mt-4" key={smenuindex}><Link href={smenuitem.link}>{smenuitem.name}</Link></li>
                      ))
                    }
                  </ul>
                </div>
              ))}
            </div>
          ))
        }
       </div>

       <div>
         <h4 className="text-2xl text-white font-[700] md:text-left text-center ">Shop</h4>
       {
        categrories?.map((items, index) => (
            <div key={index} className="md:text-left text-center" >
              <ul className="">
              <li
              onClick={() => handleDispatch(items)}
              className="text-white text-opacity-[75%] transition-all duration-150 text-lg font-[400] mt-4 hover:text-opacity-[100%]" key={index}><Link href={'/products'}>{items.name}</Link></li>

              </ul>
              {
                items.logo && <Image src={items.logo} width={60} height={60} alt="logo" className="m-8"></Image>
              }

              {items.secondmenu && items.secondmenu.map((seconmenuitem, secondmenuindex) => (
                <div className="pt-4" key={secondmenuindex}>
                  <h4 className="text-2xl text-white font-[700] mt-4">{seconmenuitem.heading}</h4>
                  <ul className="">
                    {
                      seconmenuitem.menus.map((smenuitem, smenuindex) => (
                        <li className="text-white text-opacity-[75%] text-lg font-[400] mt-4" key={smenuindex}><Link href={smenuitem.link}>{smenuitem.name}</Link></li>
                      ))
                    }
                  </ul>
                </div>
              ))}
            </div>
          ))
        }
       </div>

       <div>
       {
        foooterlinkabout.map((items, index) => (
            <div key={index} className="md:text-left text-center" >
              <h4 className="text-2xl text-white font-[700]">{items.heading}</h4>
              <ul className="">
                {
                  items.menus.map((menuitem, menuindex) => (
                    <li className="text-white text-opacity-[75%] transition-all duration-150 text-lg font-[400] mt-4 hover:text-opacity-[100%]" key={menuindex}><Link href={menuitem.link}>{menuitem.name}</Link></li>
                  ))
                }
              </ul>
              {
                items.logo && <Image src={items.logo} width={60} height={60} alt="logo" className="mt-8 md:mx-8 mx-auto mb-3"></Image>
              }

              <div className="w-full">
                <a href="https://oneando.in/" target="_blank" className="flex gap-2 items-center md:justify-start  justify-center">
                <span className=" text-white font-[700] lg:text-[1rem] text-sm">Powerd by 1&0</span>  <img src="https://s3.ap-south-1.amazonaws.com/assets.oneando.in/logo/logo-p.webp" className="w-[50px]" alt="" />
                </a>
              </div>

              {items.secondmenu && items.secondmenu.map((seconmenuitem, secondmenuindex) => (
                <div className="pt-4" key={secondmenuindex}>
                  <h4 className="text-2xl text-white font-[700] mt-4">{seconmenuitem.heading}</h4>
                  <ul className="">
                    {
                      seconmenuitem.menus.map((smenuitem, smenuindex) => (
                        <li className="text-white text-opacity-[75%] text-lg font-[400] mt-4" key={smenuindex}><Link href={smenuitem.link}>{smenuitem.name}</Link></li>
                      ))
                    }
                  </ul>
                </div>
              ))}
            </div>
          ))
        }
       </div>
      </div>
    </div>
  )
}
