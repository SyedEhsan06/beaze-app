"use client"
import Features from './Features'
import Productslider from './Productslider'
import Offerbanner from './Offerbanner'
import Teazeslider from './Teazeslider'
import Ratings from './Ratings'
import Sociallinks from '@/components/footer/Sociallinks'

export default function Homemain({data}) {
 

  return (
  <>
    <Features/>
    <Productslider  data={data} />
    <Offerbanner/>
    <Teazeslider data={data} heading={'Teaze'}/>
    <Ratings/>
    <Sociallinks/>
  </>
  )
}
