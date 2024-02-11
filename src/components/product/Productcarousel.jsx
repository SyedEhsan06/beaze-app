import Image from "next/image";
import React, { useState } from "react";

export default function Productcarousel({ sliderdata }) {
  const [imageindex, setimageindex] = useState(0);

  const progressbar = [
    { val: 0 },
    { val: 1 },
    { val: 2 },
    { val: 3 },
    { val: 4 },
  ];

  return (
    <div className="w-full">
      <div className="w-full h-[390px] relative mb-3 rounded-[8px]">
        <Image
          src={sliderdata?.[imageindex]}
          layout="fill"
          objectFit="cover"
          className="rounded-[8px] transition-all duration-300"
        />
      </div>
      <div className={`grid grid-cols-${sliderdata?.length} gap-2`}>
        {sliderdata?.map((items, index) => (
          <div
            className="w-full h-[130px] relative rounded-[5px] cursor-pointer "
            key={index}
            onClick={() => setimageindex(index)}
          >
            <Image
              src={items}
              layout="fill"
              objectFit="cover"
              className="rounded-[5px] cursor-pointer hover:opacity-[80%] hover:shadow-sm transition-all duration-150 "
            />
          </div>
        ))}
      </div>


      
      <div
        className={`grid grid-cols-${sliderdata?.length} mt-3 h-[5px] bg-[#E9E6E0CC] bg-opacity-[80%]`}
      >
        {progressbar.slice(0, sliderdata?.length).map((items, index) => (
          <div
            className={`h-[100%] transition-all duration-300 bg-opacity-[80%] w-full ${
              index === imageindex ? "bg-[#FFB61DCC]" : " bg-transparent"
            }`}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
}
