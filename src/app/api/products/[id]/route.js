import { connectToDb } from '@/lib/utils';
import Product from '../../../../lib/models/products';
import { NextResponse } from 'next/server';

connectToDb();

export async function GET(Request) {
  let id = await Request.url
  id = id.split('/')[5]
  // console.log(id.split('/')[5])
  try{
    const products = await Product.findById({ _id: id });
    return Response.json({products});
  }
  catch(error){
    console.error('GET request error:', error);
    return Response.json({error: 'Internal Server Error'})
  }
}


