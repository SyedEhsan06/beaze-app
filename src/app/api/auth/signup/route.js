import { sendOTP } from "@/utils/verifyOtpUtils";
import User from "@/lib/models/user.model";
// import jwt from "jsonwebtoken";

// const secret = process.env.SECRET;
// const expiresIn = "1d";

// function generateToken(user) {
//   return jwt.sign(user, secret, { expiresIn });
// }

export async function POST(req) {
  let { phone, firstName, lastName } = await req.json();
  console.log(phone, firstName, lastName)
  phone = "+91" + phone;
  try {
    let user = await User.findOne({ phone_number: phone });

    if (!user) {
      const { otp, expiration } = await sendOTP(phone);

      user = new User({
        phone_number: phone,
        first_name: firstName,
        last_name: lastName,
        otp: { code: otp.toString(), expiration },
        isVerified: false, 
      });

      await user.save();
    } else {
      const { otp, expiration } = await sendOTP(phone);

      user.otp = { code: otp.toString(), expiration };
      user.isVerified = false;
      await user.save();
    }

    // const token = generateToken({ phone });

    return Response.json({ message: "OTP sent for verification" });
  } catch (error) {
    console.error("Signup error:", error);
    return Response.json({ error: "Internal Server Error" });
  } 
}
