import { verifyOTP } from "@/utils/verifyOtpUtils";
import User from "@/lib/models/user.model";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;
const expiresIn = "1d";

function generateToken(user) {
  return jwt.sign(user, secret, { expiresIn });
}

export async function POST(req) {
let { phone, otp } = await req.json(); 
  try {
    // Verify OTP
    const isOTPVerified = await verifyOTP(phone, otp);
    if (isOTPVerified) {
      // Update user's verification status
      await User.findOneAndUpdate(
        { phone_number: phone },
        { isVerified: true },
        { new: true }
      );


      const token = generateToken({ phone });


      return Response.json({ token, message: "OTP verified successfully" });
    } else {
      // If OTP verification fails, return an error
      return Response.json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Verify OTP error:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}
