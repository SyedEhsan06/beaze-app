import Link from "next/link";
import Image from "next/image";
import Loader from "../loader/Loader";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/redux/slices/productSlice";
import { toggleCategory, toggleCategoryCall, toggleColor, toggleSubcategory } from "@/redux/slices/filterSlice";
import { useRouter } from "next/navigation";
export default function Shopmenu({ meudata, Closeref, closevaribale,showmenucose }) {
  const dispatch = useDispatch();

  const handleDispatch = (type, item) => {
    console.log("type", type, "item", item.subcategories.map((item) => item.name));
    dispatch(toggleSubcategory([]));
    dispatch(toggleCategory([]));
    dispatch(toggleCategoryCall([]));
    dispatch(toggleCategory(item.name));
    dispatch(toggleCategoryCall(item.name));
    // item.subcategories.forEach((subcategory) => {
    //   // console.log("subcategory", subcategory.name);
    //   dispatch(toggleSubcategory(subcategory.name));
    //   // dispatch(
    //   //   fetchProducts({
    //   //     type,
    //   //     item: subcategory.name,
    //   //   })
    //   // );
    // });
  };


  const router = useRouter();
  const handelnavigate = (items) => {
    showmenucose(false)
    handleDispatch("category", items)
    router.push('/products')
  }

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
              className="bg-white p-1 rounded-[7px] transition-all duration-75 border-transparent border lg:hover:border-theme-footer-bg"
              key={index}
              onClick={() => Closeref(0)}
            >
              <div onClick={() => handelnavigate(items)}
               
              >
                <div className="flex items-center gap-x-2">
                  <div className="w-3/12 cursor-pointer relative md:h-[70px] h-[50px] overflow-hidden rounded-[7px]">
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
                    <p className="text-lg font-[500] text-center">{items.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
