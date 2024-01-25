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

      const existingProduct = await Product.findOne({ productId: data.productId });

      if (existingProduct) {
          const incrementQuantity = data.quantity || 1;
          existingProduct.quantity += incrementQuantity;
          await existingProduct.save();
          return new Response.json(existingProduct);
      } else {
          const products = await Product.insertMany(data);
          return new Response.json(products);
      }
  } catch (error) {
      console.error('POST request error:', error);
      return new Response(500, { error: 'Internal Server Error' });
  }
}
