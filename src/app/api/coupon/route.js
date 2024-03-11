import couponModel from '@/lib/models/coupon';
import { connectToDb } from '@/lib/utils';
import jwt from 'jsonwebtoken';

export async function GET(req) {
    await connectToDb();
    try{
        let query = req.url.split('?')[1];
        console.log(query);
        let coupons = await couponModel.find();
        return Response.json({coupons});
    }
    catch(error){
        console.error("Error getting coupons:", error);
        return Response.json({error: "Internal server error"}, {status: 500});
    }
}

export async function POST(req) {
    await connectToDb();
    try{
        let {code, discount} = await req.json();
        let coupon = new couponModel({code, discount});
        await coupon.save();
        return Response.json({message: "Coupon created successfully"});

    }
    catch(error){
        console.error("Error creating coupon:", error);
        return Response.json({error: "Internal server error"}, {status: 500});
    }
}