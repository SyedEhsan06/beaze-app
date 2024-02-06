import Category from "@/lib/models/category";
import { connectToDb } from "@/lib/utils";

export async function GET(req) {
  await connectToDb();
  let categories;
  try {
    let queryParams = req.url.split("?")[1];
    if (queryParams) {
      queryParams = decodeURIComponent(queryParams);
    }
    if (queryParams) {
      categories = await Category.find({ name: queryParams });
    } else {
      categories = await Category.find();
    }
  } catch (err) {
    return Response.json({ error: err.message });
  }
  return Response.json({ categories });
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
  } catch (err) {
    return Response.json({ error: err.message });
  }
}
