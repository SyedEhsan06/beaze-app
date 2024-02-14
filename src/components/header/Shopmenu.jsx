import Link from "next/link";
import Image from "next/image";
import Loader from "../loader/Loader";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/redux/slices/productSlice";
import { toggleSubcategory } from "@/redux/slices/filterSlice";

export default function Shopmenu({ meudata, Closeref, closevaribale }) {
  const dispatch = useDispatch();
  const handleDispatch = (type, item) => {
    dispatch(toggleSubcategory([]));
    dispatch(
      fetchProducts({
        type,
        item,
      })
    );
  };
  return (
    <>
      {!meudata ? (
        <Loader />
      ) : (
        <div
          className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-4 gap-x-5 gap-y-3"
          onClick={() => closevaribale(true)}
        >
          {meudata?.map((items, index) => (
            <div
              className="bg-white p-1   rounded-[7px] transition-all duration-75  border-transparent border lg:hover:border-theme-footer-bg"
              key={index}
              onClick={() => Closeref(0)}
            >
              <Link
                href={{
                  pathname: `/products`,
                }}
                onMouseDown={() => handleDispatch("category", items.name)}
              >
                <div className="flex items-center gap-x-2  ">
                  <div className="w-3/12  cursor-pointer   relative   md:h-[70px] h-[50px] overflow-hidden rounded-[7px]">
                    {items.img ? (
                      <Image
                        src={
                          items.img == "categoryimage"
                            ? "/images/web/product/notfound.png"
                            : items.img
                        }
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
                    <p className=" text-lg font-[500] text-center  ">
                      {items.name}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
