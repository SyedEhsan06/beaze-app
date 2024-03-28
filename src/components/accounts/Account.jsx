"use client";
import { accounttabs } from "@/utils/dummydata";
import React, { useEffect, useState } from "react";
import Accountdetails from "./Accountdetails";
import Addressdeatils from "./Addressdeatils";
import Orderdeatails from "./Orderdeatails";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/userData.slice";
import cookieCutter from "cookie-cutter";
import Loaderfixed from "../loader/Loaderfixed";
import { useRouter } from "next/navigation";

export default function Account() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const selectDataOfUser = useSelector(selectUser);
  const [token, settoken] = useState("");
  useEffect(() => {
    const newtoken = cookieCutter.get("token");
    settoken(newtoken);
  }, []);

  const router = useRouter();
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`;
  // const token = cookieCutter.get("token");\
  console.log("token", token);
  const fetchDataProfile = async () => {
    setLoading(true);
    try {
      if (token) {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data.user);
        setLoading(false);
       console.log("user data", res.data.user);
      }
    } catch (error) {
      console.log("Error fetching user data account:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataProfile();
  }, [selectDataOfUser]);
  const [tabs, settabs] = useState(0);
  if (router.isFallback) return <Loaderfixed />;
  return (
    <>
      {loading && <Loaderfixed />}
      <div>
        <div className="w-full md:flex  gap-x-16">
          <div className="md:w-[50%] w-full">
            <div className=" grid grid-cols-1 gap-y-4">
              {accounttabs.map((items, index) => (
                <div
                  className={`w-full bg-white cursor-pointer shadow-sm border lg:h-[90px] md:h-[70px] h-[50px] flex items-center px-6 rounded-[13px] transition-all duration-150 ${
                    tabs === index
                      ? "border-theme-footer-bg"
                      : "border-transparent"
                  }`}
                  key={index}
                  onClick={() => settabs(index)}
                >
                  <h5 className=" font-[900] lg:text-[1.4rem] md:text-xl text-lg headtext text-text-secondary ">
                    {items.title}
                  </h5>
                </div>
              ))}
            </div>

            <div className="lg:mt-12 md:mt-10 mt-5 md:block hidden">
              <div className="w-full flex gap-x-4">
                <button className="w-[50%] py-2 border headtext rounded text-text-secondary border-theme-footer-bg font-[800] lg:text-[1.4rem] md:text-xl text-[1rem]">
                  Get Help
                </button>
                <button className="w-[50%] py-2 border headtext rounded border-transparent bg-theme-footer-bg text-white font-[800] lg:text-[1.4rem] md:text-xl text-[1rem]">
                  Leave a Review
                </button>
              </div>
            </div>
          </div>

          <div className="md:w-[50%] w-full mt-5 md:mt-0">
            <div>
              {tabs === 0 ? (
                <Accountdetails data={userData} />
              ) : tabs === 1 ? (
                <Addressdeatils data={userData} />
              ) : (
                <Orderdeatails data={userData} />
              )}
            </div>
          </div>

          <div className="lg:mt-12 md:mt-10 mt-5 block md:hidden">
            <div className="w-full flex gap-x-4">
              <button className="w-[50%] py-2 border headtext rounded text-text-secondary border-theme-footer-bg font-[800] lg:text-[1.4rem] md:text-xl text-[1rem]">
                Get Help
              </button>
              <button className="w-[50%] py-2 border headtext rounded border-transparent bg-theme-footer-bg text-white font-[800] lg:text-[1.4rem] md:text-xl text-[1rem]">
                Leave a Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
