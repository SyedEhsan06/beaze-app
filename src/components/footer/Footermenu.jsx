import { footerlinsk, footerlinkresgister, footerlinkshop, foooterlinkabout} from "@/utils/dummydata";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addSearch, toggleCategory, toggleCategoryCall, toggleSubcategory } from "@/redux/slices/filterSlice";

export default function Footermenu({
  categrories
}) {
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
  };
  return (
    <div className=" py-12 px-4 md:px-10 lg:px-24 bg-theme-footer-bg  context ">
      <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-5 md:justify-items-center ">
       <div>
       {
        footerlinkresgister.map((items, index) => (
            <div key={index} >
              <h4 className="text-2xl text-white font-[700]">{items.heading}</h4>
              <ul className="">
                {
                  items.menus.map((menuitem, menuindex) => (
                    <li className="text-white text-opacity-[75%] transition-all duration-150 text-lg font-[400] mt-4 hover:text-opacity-[100%]" key={menuindex}><Link href={menuitem.link}>{menuitem.name}</Link></li>
                  ))
                }
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
         <h4 className="text-2xl text-white font-[700]">Shop</h4>
       {
        categrories?.map((items, index) => (
            <div key={index} >
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
            <div key={index} >
              <h4 className="text-2xl text-white font-[700]">{items.heading}</h4>
              <ul className="">
                {
                  items.menus.map((menuitem, menuindex) => (
                    <li className="text-white text-opacity-[75%] transition-all duration-150 text-lg font-[400] mt-4 hover:text-opacity-[100%]" key={menuindex}><Link href={menuitem.link}>{menuitem.name}</Link></li>
                  ))
                }
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
      </div>
    </div>
  )
}
