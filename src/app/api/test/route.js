import  {connectToDb}  from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';

connectToDb();
    
export async function GET() {

    const data = "Hello World"
   
    return Response.json(data)
  }