import Order from "@/lib/models/order";
import { connectToDb } from "@/lib/utils";
import User from "@/lib/models/user.model";
import { sendOTP, verifyOTP } from "@/utils/verifyOtpUtils";

  const secret = process.env.SECRET;
  export async function POST(req) {
    try {
      if (!req) {
        return Response.json({ error: "Request is undefined" }, 400);
      }
  
      await connectToDb();
      const {
        phone,
        first_name,
        last_name,
        otp
      } = await req.json();
      
      let isOTPSent, sentOTP, otpExpiration; // Declare variables outside the block
  
      // Step 1: Send OTP
      if (!otp) {
        const otpData = await sendOTP(phone);
        isOTPSent = otpData.isOTPSent;
        sentOTP = otpData.sentOTP;
        otpExpiration = otpData.otpExpiration;
      }
  
      if (!isOTPSent) {
        return Response.json({ error: "Error sending OTP" }, { status: 500 });
      }
  
      // Step 2: Verify OTP
      const isOTPSuccess = await verifyOTP(phone, otp);
      if (!isOTPSuccess) {
        return Response.json({ error: "Invalid OTP" }, { status: 400 });
      }
  
      // Step 3: Create user if needed
      let user = await User.findOne({ phone_number: phone });
      if (!user) {
        const newUser = new User({
          phone_number: phone,
          first_name,
          last_name,
        });
        await newUser.save();
      }
  
      // Step 4: Create new order
      const newOrder = new Order({
        phone,
        first_name,
        last_name,
      });
      let orderToReturn ={
        phone,
        first_name,
        last_name,
        otp,
        _id: newOrder._id,
      }
      await newOrder.save();
      console.log(newOrder);
      return Response.json({ orderToReturn });
    } catch (error) {
      console.error("Error creating order:", error);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  }

export async function PUT(req){
    try{
      await connectToDb();
      const { 
        phone,
        shipping_address,
        billing_address,
        total,
        cart,
        payment,
        paymentStatus,
        status,
        _id
      } = await req.json();

      const order = await Order.findOne({ _id});
      if (!order) {
        return Response.json({ error: "Order not found" }, { status: 404 });
      }
      order.phone = phone;
      order.shipping_address = shipping_address;
      order.billing_address = billing_address;
      order.total = total;
      order.cart = cart;
      order.payment = payment;
      order.paymentStatus = paymentStatus;
      order.status = status;
      await order.save();
      return Response.json({
        message: "Order updated successfully",
        order,
      });
    }
    catch(error){
      console.error("Error updating order:", error);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
export async function GET(req) {
  try {
    await connectToDb();
    ///////
    // const token = req.headers.get("authorization")?.replace("Bearer ", "");
    // const decodedToken = jwt.verify(token, secret);
    // const { phone } = decodedToken;
    ///////
    // const phone = "+918340263940"
    const phone = req.headers.get("phone");
    const query = req.url.split("?")[1];
    const params = new URLSearchParams(query);
    const orderId = params.get("orderId");

    const user = await User.findOne({ phone_number: phone });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    let orders;
    if (orderId) {
      const order = await Order.findOne({ _id: orderId, phone });
      if (!order) {
        return Response.json({ error: "Order not found" }, { status: 404 });
      }
      orders = [order]; 
    } else {
      orders = await Order.find({ phone });
    }

    return Response.json({ orders });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
