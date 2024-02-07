import Link from "next/link";
import Image from "next/image";

export default function Shopmenu({ meudata,showhide }) {
  return (
    <div className="grid showmenu grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-4 gap-x-5 gap-y-3">
      {meudata?.map((items, index) => (
        <div
          className="bg-white p-1 showmenu  rounded-[7px] transition-all duration-75  border-transparent border hover:border-theme-footer-bg"
          key={index}
        >
          <Link href={{
            pathname: `/products/category/${items.name}`,
          }} onClick={() => showhide(0)}>
            <div className="flex items-center gap-x-2 showmenu ">
              <div className="w-3/12  cursor-pointer   relative   h-[70px] overflow-hidden rounded-[7px]">
                {items.img ? (
                  <Image
                    src={`/images/web/shopmenu/${items.img}.jpg`}
                    alt="Your Image"
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <Image
                    src="/images/web/product/notfound.png"
                    alt="Your Image"
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>

              <div className="w-9/12">
                <p className=" text-lg font-[500] text-center showmenu ">
                  {items.name}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}