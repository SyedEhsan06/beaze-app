// verifyOtp.js


import { verifyOTP } from "@/utils/verifyOtpUtils";
import User from "@/lib/models/user.model";

export async function POST(req) {
  const { phone, otp } = await req.json(); // Assuming you need both phone number and OTP for verification

  try {
    // Verify OTP
    const isOTPVerified = await verifyOTP(phone, otp);
    if (isOTPVerified) {
      // If OTP is verified, update the user's isVerified status
        await
        User.findOneAndUpdate(
          { phone_number: phone },
          { isVerified: true },
          { new: true }
        );
    }
    // Return the result to the client
    return Response.json({ isOTPVerified });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}
