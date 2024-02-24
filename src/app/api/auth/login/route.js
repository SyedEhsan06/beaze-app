import User from "@/lib/models/user.model";
import { sendOTP, verifyOTP } from "@/utils/verifyOtpUtils";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;
const expiresIn = "1d";

function generateToken(user) {
  return jwt.sign(user, secret, { expiresIn });
}

export async function POST(req) {
  const { phone } = await req.json();
    phone = "+91" + phone;  
  try {
    let user = await User.findOne({ phone_number: phone });
    if (!user) {
      return Response.json({ message: "User not found" });
    } else {
      const { otp, expiration } = await sendOTP(phone);
      user.otp = { code: otp.toString(), expiration };
      await user.save();
      const token = generateToken({ phone });
      return Response.json({ token, message: "OTP sent for verification" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}
