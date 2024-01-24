import Category from "@/lib/models/category";
import { connectToDb } from "@/lib/utils";

connectToDb();

export async function GET() {
  try {
    const categories = await Category.find({});
    return Response.json({ categories });
  } catch (err) {
    return Response.json({ error: err.message });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
  
    const existingCategory = await Category.findOne({ name: data.name });

    if (existingCategory) {
      return Response.json({ error: "Category already exists" });
    }
    const validTypes = ["teaze", "explore", "best"];
    if (!validTypes.includes(data.type)) {
      return Response.json({ error: "Invalid category type" });
    }

    const category = await Category.create(data);
    return Response.json({ category, msg: "Category created" });
  } catch (err) {
    return Response.json({ error: err.message });
  }
}
