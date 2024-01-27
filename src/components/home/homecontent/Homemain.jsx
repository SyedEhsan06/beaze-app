"use client"
import Features from './Features'
import Productslider from './Productslider'
import Offerbanner from './Offerbanner'
import Teazeslider from './Teazeslider'
import Ratings from './Ratings'

export default function Homemain({data}) {
 
    

  return (
  <>
    <Features/>
    <Productslider  data={data} />
    <Offerbanner/>
    <Teazeslider  />
    <Ratings/>
  </>
  )
}
