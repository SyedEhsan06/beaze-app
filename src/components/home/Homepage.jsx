"use client";
import React, { useState, useEffect } from "react";
import Homebanner from "./banner/Homebanner";
import Homemain from './homecontent/Homemain';
import { fetchData } from "@/utils/apicall";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, selectCategories } from "@/redux/slices/categorySlice";

export default function Homepage() {
    const [data, setData] = useState([]);
    const[loader,setloader] = useState(true)
    const dispatch = useDispatch()
    let selectData = useSelector(selectCategories)
    useEffect(() => {
        if(selectData.length === 0){
            dispatch(fetchCategories())
            console.log(selectData)
        }
        setData(selectData)
        if(selectData){
            setloader(false)
        }
    }
    , [selectData]);
    
  
    return (
        <>
          {
            loader ? <Loader/> : <>
            <Homebanner data={data} />
            <div className="grid grid-cols-1 mt-10 overflow-x-hidden">
                <Homemain data={data} />
            </div>
            </>
          }
        </>
    );
}
