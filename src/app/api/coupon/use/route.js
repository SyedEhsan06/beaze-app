import { connectToDb } from '@/lib/utils';
import User from '@/lib/models/user.model';
import Coupon from '@/lib/models/coupon';
import jwt from 'jsonwebtoken';
const secret = process.env.SECRET;

export async function POST(req) {
    await connectToDb();
    try {
        const { code } = await req.json();
        const token = req.headers.get("authorization")?.replace("Bearer ", "");
        const decodedToken = jwt.verify(token, secret);
        const { phone } = decodedToken;
        
        // Find the user by phone number
        const user = await User.findOne({ phone_number: phone });
        
        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        // Check if the coupon is already applied to the user
        console.log('user',user.coupons)
        if (user.coupons.includes(coupon._id)) {
            return Response.json({ error: "Coupon already applied" }, { status: 400 });
        }

        // Find the coupon by its code
        const coupon = await Coupon.findOne({ code });
        
        if (!coupon) {
            return Response.json({ error: "Coupon not found" }, { status: 404 });
        }

        // Check if the coupon is active
        if (!coupon.active) {
            return Response.json({ error: "Coupon not active" }, { status: 400 });
        }

        // Validate coupon
        if (coupon.validFrom > new Date()) {
            return Response.json({ error: "Coupon not valid yet" }, { status: 400 });
        }
        if (coupon.validTill < new Date()) {
            return Response.json({ error: "Coupon expired" }, { status: 400 });
        }
        if (coupon.minOrder > user.cart.total) {
            return Response.json({ error: "Minimum order value not met" }, { status: 400 });
        }

        // Apply coupon to user's cart
        let discount = coupon.discount;
        if (coupon.maxDiscount && coupon.maxDiscount < discount) {
            discount = coupon.maxDiscount;
        }
        
        // Deduct discount from cart total or update cart
        
        // Update user's coupons
        user.coupons.push(coupon._id);
        await user.save();

        return Response.json({ 
            discount,
            couponId: coupon._id,
            message: "Coupon applied successfully"
        });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
