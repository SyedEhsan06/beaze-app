"use client"
import { useRouter } from "next/navigation";
import cookieCutter from "cookie-cutter";
import { useDispatch,useSelector } from "react-redux";
import { selectUser,updateUser} from "@/redux/slices/userData.slice";
export default function Accounthead() {
    const router = useRouter();
    const dispatch = useDispatch();
    const handleLogout = () => {
        cookieCutter.set("token", "");
        router.push("/");
        dispatch(updateUser({first_name: '',last_name: '',phone_number: '',address: [],cart: [],email: '',role: '',isVerified: false}));

    };

  const data = useSelector(selectUser);

  console.log(data);
  return (
    <div>
      <div className="w-full md:flex">
        <h5 className=" lg:text-4xl md:text-3xl text-2xl font-[900] headtext text-theme-footer-bg">
          Welcome, {data?.first_name}
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
