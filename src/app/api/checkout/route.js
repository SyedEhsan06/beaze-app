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
    
    console.log(phone, first_name, last_name, address, cart, total, payment, paymentStatus, status, createmyaccount);  

    // Step 1: Send OTP
    const { isOTPSent, sentOTP, otpExpiration } = await sendOTP(phone);

    if (!isOTPSent) {
      return Response.json({ error: "Error sending OTP" }, { status: 500 });
    }

    // Step 2: Verify OTP
    const isOTPSuccess = await verifyOTP(phone, otp);
    if (!isOTPSuccess) {
      return Response.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Step 3: Create user if needed
    let user = null;
    if (createmyaccount) {
      user = await User.findOne({ phone_number: phone });
      if (!user) {
        const newUser = new User({
          phone_number: phone,
          first_name,
          last_name,
          address,
          cart,
        });
        await newUser.save();
      }
    }

    // Step 4: Create new order
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
    console.log(newOrder);
    return Response.json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
