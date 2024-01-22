import { IoStarSharp } from "react-icons/io5";

export default function Stars({ rating }) {
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= rating; i++) {
          stars.push(
            <span key={i} >
             <IoStarSharp />
            </span>
          );
        }
        return stars;
      };
  return (
    <div className=" text-rating-stars w-full flex justify-center gap-2 mb-4 text-[25px] lg:text-[50px]">
        {renderStars()}
    </div>
  )
}
