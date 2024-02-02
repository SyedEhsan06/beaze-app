import Category from "@/lib/models/category";
import { connectToDb } from "@/lib/utils";


export async function GET() {
 await connectToDb();
  try {
    const categories = await Category.find({});
    return Response.json({ categories });
  } catch (err) {
    return Response.json({ error: err.message });
  }
}

export async function POST(req) {
  await connectToDb();
  try {
    const data = await req.json();
    const existingCategory = await Category.findOne({
      name: data.name,
    });
    if (existingCategory) {
      return Response.json({ error: "Category already exists" });
    } 
    const category = new Category(data);
    await category.save();
    return Response.json({ category });
  
}
  catch (err) {
    return Response.json({ error: err.message });
  }
}

