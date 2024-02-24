import User from "@/lib/models/user.model";
import { verifyOTP } from "@/utils/verifyOtpUtils";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

export async function POST(req) {
  const { phone, otp } = await req.json();
  console.log("phone", phone);
  console.log("otp", otp);
  try {
    const isOTPVerified = await verifyOTP(phone, otp);
    if (!isOTPVerified) {
      return Response.json({ error: "Invalid OTP" });
    }

    let user = await User.findOne({ phone_number: phone });

    if (!user) {
      return Response.json({ error: "User not found. Please create an account." });
    }

    const token = jwt.sign({ phone }, secret);

    return Response.json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Verification error:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}
