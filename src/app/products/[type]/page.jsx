"use client";
import Containercategories from "@/components/categories/Containercategories";
import { useSearchParams } from "next/navigation";


export default function page({params}) {
  return (
   <>
      <Containercategories params={params} />
   </>
  )
}
