"use client";
import React, { useState, useEffect } from "react";
import Homebanner from "./banner/Homebanner";
import Homemain from './homecontent/Homemain';
import { fetchData } from "@/utils/apicall";
import Loader from "../loader/Loader";

export default function Homepage() {
    const [data, setData] = useState([]);
    const[loader,setloader] = useState(false)

    useEffect(() => {
        const fetchDataAsync = async () => {
            setloader(true)
            try {
                const result = await fetchData('category');
                setData(result);
                setloader(false)
            } catch (error) {
                console.error('Error fetching data:', error);
                setloader(false)
            }
        };

        fetchDataAsync();
    }, []);

    return (
        <>
          {
            loader ? <Loader/> : <>
            <Homebanner />
            <div className="grid grid-cols-1 mt-10 overflow-x-hidden">
                <Homemain data={data} />
            </div>
            </>
          }
        </>
    );
}
