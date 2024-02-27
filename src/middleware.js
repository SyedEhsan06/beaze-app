import { NextResponse } from 'next/server'
 import {cookies} from 'next/headers'
export function middleware(request) {
    console.log("Request",request.cookies)
    console.log("Request",request.url)
    const token = cookies().get('token').value
    // console.log("Token",)
    console.log("Token",token)
   if(token===''){
    return   NextResponse.redirect(new URL('/login', request.url))
    
   }
    return NextResponse.next()
}
 
export const config = {
  matcher: '/account/:path*',
}