"use client";
import React, { useState, useEffect } from "react";
import Homebanner from "./banner/Homebanner";
import Homemain from './homecontent/Homemain';
import { fetchData } from "@/utils/apicall";

export default function Homepage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const result = await fetchData('category');
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataAsync();
    }, []);

    return (
        <>
            <Homebanner />
            <div className="grid grid-cols-1 mt-10 overflow-x-hidden">
                <Homemain data={data} />
            </div>
        </>
    );
}
