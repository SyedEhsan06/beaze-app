import { connectToDb } from '@/lib/utils';
import Product from '@/lib/models/products';

connectToDb();

export async function GET(req) {
    try {
        const queryParams = req.url.split('?')[1];
        const queryObject = {};

        if (queryParams) {
            queryParams.split('&').forEach(param => {
                const [key, value] = param.split('=');
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
            const searchRegex = { $regex: queryObject.search, $options: 'i' };

            products = await Product.find({
                $or: [
                    { category: searchRegex },
                    { title: searchRegex },
                    { subcategory: searchRegex },
                    { 'features.title': searchRegex },
                ],
            });
        } else if (queryObject.filter) {
            const filterObject = {};
            let filters = queryObject.filter.split(',');
            filters.forEach(filter => {
                const [key, value] = filter.split(':');
                if (filterObject[key]) {
                    filterObject[key].push(value);
                } else {
                    filterObject[key] = [value];
                }
            }); // Corrected placement of closing parenthesis
            products = await Product.find(filterObject);
        }
        else {
            products = await Product.find({});
        }

        return Response.json({ products, count: products.length });
    } catch (error) {
        console.error('GET request error:', error);
        return Response.json({ error: 'Internal Server Error' });
    }
}

export async function POST(req) {
    try {
        const data = await req.json();

        const existingProduct = await Product.findOne({ productId: data.productId });

        if (existingProduct) {
            existingProduct.quantity += 1;
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
