import Order from "@/lib/models/order";
import { connectToDb } from "@/lib/utils";
import User from "@/lib/models/user.model";
import { sendOTP, verifyOTP } from "@/utils/verifyOtpUtils";
import Product from "@/lib/models/products";
import jwt from "jsonwebtoken";
const secret = process.env.SECRET;
export async function POST(req) {
  try {
    if (!req) {
      return Response.json({ error: "Request is undefined" }, 400);
    }

    await connectToDb();
    const { 
      first_name, 
      last_name,
      cart,
      total,
      payment,
      paymentStatus,
      status,
      shipping_address,
      billing_address,
    } = await req.json();
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    // const decodedToken = jwt.verify(token, secret);
    // const { phone } = decodedToken;
    const phone = "+918340263940";
    const user = await User.findOne({ phone_number: phone });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
  
    console.log(first_name, last_name, phone, cart, total, payment, paymentStatus, status, shipping_address, billing_address)
    const order = new Order({
      first_name,
      last_name,
      phone,
      cart,
      total,
      payment,
      paymentStatus,
      status,
      shipping_address,
      billing_address,
    });  
    await order.save();
    // let products = await Product.find();
    // for (let i = 0; i < cart.length; i++) {
    //   let product = products.find((p) => p._id == cart[i].productId);
    //   product.quantity = product.quantity - cart[i].selectedQty;
    //   await product.save();
    // }
    return Response.json({ order });
  } catch (error) {
    console.error("Error creating order:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
export async function PUT(req) {
  try {
    await connectToDb();
    const {
      first_name,
      last_name,
      phone,
      shipping_address,
      billing_address,
      total,
      cart,
      payment,
      paymentStatus,
      status,
      _id,
    } = await req.json();

    const order = await Order.findOne({ _id });
    if (!order) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }
    if (first_name) order.first_name = first_name;
    if (last_name) order.last_name = last_name;
    if (phone) order.phone = phone;
    if (shipping_address) order.shipping_address = shipping_address;
    if (billing_address) order.billing_address = billing_address;
    if (total) order.total = total;
    if (cart) order.cart = cart;
    if (payment) order.payment = payment;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (status) order.status = status;
    let products = await Product.find();
    
    await order.save();
    return Response.json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
export async function GET(req) {
  try {
    await connectToDb();
    ///////
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, secret);
    const { phone } = decodedToken;
    ///////
    // const phone = "+918340263940"
    // const phone = req.headers.get("phone");
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
