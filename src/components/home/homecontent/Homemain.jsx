"use client"
import Features from './Features'
import Productslider from './Productslider'
import Offerbanner from './Offerbanner'
import Teazeslider from './Teazeslider'
import Ratings from './Ratings'
import { useEffect } from 'react'
import { fetchData } from '@/utils/apicall'

export default function Homemain() {
 
    useEffect(() => {
        handelgetcategories()
    },[])
    const handelgetcategories = async() => {
        try{
            const response = await fetchData('category')
          console.log(response.categories)

        }catch(err){
            console.log(err)
        }
    }
  return (
  <>
    <Features/>
    <Productslider/>
    <Offerbanner/>
    <Teazeslider/>
    <Ratings/>
  </>
  )
}
