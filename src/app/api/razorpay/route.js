import Razorpay from 'razorpay';
import shortid from 'shortid';
import OrderModel from '@/lib/models/order';
import { connectToDb } from '@/lib/utils';

export async function POST(req) {
    await connectToDb();
    const { amount, currency, receipt, notes } = await req.json();
    console.log(amount, currency, receipt, notes);
    try {
        if (!req) {
            return Response.json({ error: "Request is undefined" }, 400);
        }   
        // const { amount, currency, receipt, notes } = await req.json();

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const options = {
            amount: amount * 100,
            currency,
            receipt: receipt || shortid.generate(),
            notes
        };
        const order = await instance.orders.create(options);

        if (!order) {
            return Response.json({ error: "Failed to create order" }, 500);
        }
        return Response.json({ order });
    } catch (error) {
        return Response.json({ error: error.message }, 500);
    }
}
