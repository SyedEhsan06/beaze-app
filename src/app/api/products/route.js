import { connectToDb } from "@/lib/utils";
import Product from "@/lib/models/products";

export async function GET(req) {
  await connectToDb();
  try {
    let queryParams = req.url.split("?")[1];
    const queryObject = {};
    queryParams = decodeURIComponent(queryParams);
    if (queryParams == "Women%E2%80%99s%20Clothes") {
      queryParams = "category=Women%27s%20Clothes";
    } else if (queryParams == "Men%E2%80%99s%20Clothes") {
      queryParams = "category=Men%27s%20Clothes";
    } else if (queryParams.toLowerCase().includes("men")) {
      queryParams = queryParams.replace(/men'?s?/gi, "Men's Clothes");
    } else if (queryParams.toLowerCase().includes("women")) {
      queryParams = queryParams.replace(/women'?s?/gi, "Women's Clothes");
    }
    if (queryParams) {
      queryParams.split("&").forEach((param) => {
        const [key, value] = param.split("=");
        queryObject[key] = value;
      });
    }

    let products;

    if (queryObject.category && queryObject.subcategory) {
      products = await Product.find({
        category: queryObject.category,
        subcategory: queryObject.subcategory,
      });
    } else if (queryObject.category) {
      products = await Product.find({ category: queryObject.category });
    } else if (queryObject.subcategory) {
      products = await Product.find({ subcategory: queryObject.subcategory });
    } else if (queryObject.search) {
      const searchRegex = { $regex: queryObject.search, $options: "i" };

      products = await Product.find({
        $or: [
          { category: searchRegex },
          { title: searchRegex },
          { subcategory: searchRegex },
          { "features.title": searchRegex },
        ],
      });
    } else if (
      queryObject.type &&
      (queryObject.color ||
        queryObject.size ||
        queryObject.material ||
        queryObject.sleeve)
    ) {
      const subcategories = queryObject.type
        .split(",")
        .map((type) => type.trim());
      let filter = { subcategory: { $in: subcategories } };
      if (queryObject.category) {
        filter["category"] = queryObject.category;
      }

      if (queryObject.color) {
        const colors = queryObject.color.split(",");
        filter["attributes"] = {
          $elemMatch: { name: "Colors", value: { $in: colors } },
        };
      }

      if (queryObject.size) {
        const sizes = queryObject.size.split(",");
        if (filter["attributes"]) {
          filter["attributes"]["$elemMatch"]["name"] = "Sizes";
          filter["attributes"]["$elemMatch"]["value"] = { $in: sizes };
        } else {
          filter["attributes"] = {
            $elemMatch: { name: "Sizes", value: { $in: sizes } },
          };
        }
      }

      if (queryObject.material) {
        if (!filter["attributes"]) filter["attributes"] = {};
        filter["attributes"]["$elemMatch"] = {
          name: "Material",
          value: queryObject.material,
        };
      }

      if (queryObject.sleeve) {
        if (!filter["attributes"]) filter["attributes"] = {};
        filter["attributes"]["$elemMatch"] = {
          name: "Sleeve",
          value: queryObject.sleeve,
        };
      }

      let filteredProd = await Product.find(filter);
      return Response.json({ filteredProd, count: filteredProd.length });
    }
    // Only subcategory
    else if (
      queryObject.type &&
      !queryObject.color &&
      !queryObject.size &&
      !queryObject.material &&
      !queryObject.sleeve
    ) {
      const subcategories = queryObject.type
        .split(",")
        .map((type) => type.trim());
    //   console.log("subcategory", subcategories);
      let products = await Product.find({
        subcategory: { $in: subcategories },
      });
      return Response.json({ products, count: products.length });
    } else {
      products = await Product.find({});
    }

    return Response.json({ products, count: products.length });
  } catch (error) {
    console.error("GET request error:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}

export async function POST(req, res) {
  await connectToDb();

  try {
    const data = await req.json();

    const existingProduct = await Product.findOne({
      productId: data.productId,
    });

    if (existingProduct) {
      existingProduct.quantity += 1;
      await existingProduct.save();
      return Response.json(existingProduct);
    } else {
      const products = await Product.insertMany(data);
      return Response.json(products);
    }
  } catch (error) {
    console.error("POST request error:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}
