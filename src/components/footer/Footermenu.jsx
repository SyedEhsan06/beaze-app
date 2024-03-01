import { footerlinsk } from "@/utils/dummydata";
import Link from "next/link";
import Image from "next/image";

export default function Footermenu() {
  console.log(footerlinsk)
  return (
    <div className=" py-12 px-4 md:px-10 lg:px-24 bg-theme-footer-bg  context ">
      <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-5 md:justify-items-center ">
        {
          footerlinsk.map((items, index) => (
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
  )
}
