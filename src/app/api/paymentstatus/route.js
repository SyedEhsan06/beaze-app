import Razorpay from 'razorpay';
import shortid from 'shortid';

import { connectToDb } from '@/lib/utils';

export async function POST(req) {
    // Handle success
    await connectToDb();

    try {
        if (!req) {
            return Response.json({ error: "Request is undefined" }, 400);
        }   

        // Parse the request body
        const { 
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            productId
        } = await req.json();

        // Check if all required fields are present
        if (!orderCreationId || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature || !productId) {
            return Response.json({ error: "Invalid data" }, 400);
        }

        // Return the successful response with payment details
        return Response.json({
            paymentStatus: "success",
            productId,
            orderId: orderCreationId,
            paymentId: razorpayPaymentId,
            orderId: razorpayOrderId,
            signature: razorpaySignature
        });
    } catch (error) {
        // Handle any errors that might occur during processing
        console.error("Error:", error);
        return Response.json({ error: "An error occurred while processing the payment" }, 500);
    }
}
