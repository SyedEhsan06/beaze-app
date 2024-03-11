import Category from "@/lib/models/category";
import { connectToDb } from "@/lib/utils";
import Products from "@/lib/models/products";
export async function GET(req) {
  await connectToDb();
  // let Products = await Products.find();
  try {
    let queryParams = req.url.split("?")[1];
    if (queryParams) {
      queryParams = decodeURIComponent(queryParams);
    }
    
    let categories;
    if (queryParams) {
      categories = await Category.find({ name: queryParams });
    } else {
      // Fetch all categories
      categories = await Category.find();
      
      // Fetch all products
      const products = await Products.find();
      
      // Find categories that have associated products
      categories = categories.filter(category =>
        products.some(product => product.category === category.name)
      );
    }
    
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
  } catch (err) {
    return Response.json({ error: err.message });
  }
}
