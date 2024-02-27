import Order from "@/lib/models/order";
import { connectToDb } from "@/lib/utils";
import User from "@/lib/models/user.model";
import { sendOTP, verifyOTP } from "@/utils/verifyOtpUtils";
import { Response } from "next";

export async function POST(req) {
  try {
    await connectToDb();
    const {
      phone,
      first_name,
      last_name,
      address,
      cart,
      total,
      payment,
      paymentStatus,
      status,
      otp,
      createmyaccount,
    } = await req.json();
    let user = await User.findOne({ phone_number: phone });
        console.log("user", user);
        console.log(phone, first_name, last_name, address, cart, total, payment, paymentStatus, status, createmyaccount);  
    const { isOTPSent, sentOTP, otpExpiration } = await sendOTP(phone);
    
    if (!isOTPSent) {
      return Response.json({ error: "Error sending OTP" }, { status: 500 });
    }
    
    
    if (phone){
      const isOTPSuccess = await verifyOTP(phone, otp);
      if (!isOTPSuccess) {
        return Response.json({ error: "Invalid OTP" }, { status: 400 });
      }
    }

    // Create user if needed
    if (createmyaccount && !user) {
      const newUser = new User({
        phone_number: phone,
        first_name,
        last_name,
        address,
        cart,
      });
      await newUser.save();
    }

    // Create new order
    const newOrder = new Order({
      phone,
      first_name,
      last_name,
      address,
      cart,
      total,
      payment,
      paymentStatus,
      status,
    });

    await newOrder.save();

    return Response.json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
