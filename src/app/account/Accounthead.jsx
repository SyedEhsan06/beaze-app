"use client"
import { useRouter } from "next/navigation";
import cookieCutter from "cookie-cutter";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userData.slice";
export default function Accounthead() {
    const router = useRouter();
    const dispatch = useDispatch();
    const handleLogout = () => {
        cookieCutter.set("token", "");
        router.push("/");
        dispatch(setUser({}));

    };
  return (
    <div>
      <div className="w-full md:flex">
        <h5 className=" lg:text-4xl md:text-3xl text-2xl font-[900] headtext text-theme-footer-bg">
          Welcome, Sherlock
        </h5>
        <button
        onClick={handleLogout}
        className=" ml-auto  my-3 md:mt-0 headtext md:w-[13%] w-[40%] md:py-2 py-1 text-white font-[400]  bg-[#3E3C3F] md:text-xl text-lg  rounded shadow-sm">
          Logout
        </button>
      </div>
    </div>
  );
}
