import Category from "@/lib/models/category";
import { connectToDb } from "@/lib/utils";
connectToDb();
export async function GET() {
  const categories = await Category.find({});
  return Response.json({ categories });
}
export async function POST(req){
  try{
    const data = await req.json();  
    const category = Category.insertMany(data);
    return Response.json({ category });
  }
  catch(err){
    return Response.json({ err });
  }
  return Response.json({ msg: "Category created" });

}