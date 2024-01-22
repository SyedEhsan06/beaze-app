import  {connectToDb}  from '@/lib/utils';
import Product from '../../../lib/models/products';
import { NextResponse } from 'next/server';
connectToDb();
    
export async function GET() {
  const products = await Product.find({});
  return Response.json({products});
}

export async function POST(req){
  const data  =await req.json()
try {
  const products = await Product.insertMany(data);
  Response.json(products);
}
catch (error) {
  console.log(error);
  Response.json({ error: error });
}
  return Response.json(data)
}