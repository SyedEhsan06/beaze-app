// Import necessary modules
import { connectToDb } from "@/lib/utils";
import User from "@/lib/models/user.model";
import twilio from "twilio";

// Twilio configuration
const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  twilioNumber: process.env.TWILIO_PHONE_NUMBER,
};

const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

// Function to generate and send OTP
async function sendOTP(phone) {
  const otp = Math.floor(1000 + Math.random() * 9000);
  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 5);

  // Send OTP via Twilio
  await client.messages.create({
    body: `Your Beaze verification code is ${otp}`,
    from: twilioConfig.twilioNumber,
    to: phone,
  });

  return { code: otp.toString(), expiration };
}

// Function to verify OTP
async function verifyOTP(phone, enteredOTP) {
  try {
    await connectToDb();

    // Find the user by phone number and OTP
    const user = await User.findOne({
      phone_number: phone,
      "otp.code": enteredOTP,
      "otp.expiration": { $gt: new Date() }, // Check if OTP is not expired
    });

    return user !== null;
  } catch (error) {
    console.error("Verify OTP error:", error);
    return false;
  }
}

export async function handleAuth(req) {
  const { phone, firstName, lastName, otp, action } = await req.json();

  try {
    await connectToDb();

    if (action === "signup" || action === "login") {
      // Verify OTP
      const otpVerified = await verifyOTP(phone, otp);

      if (!otpVerified) {
        return Response.json({ error: "Invalid OTP" });
      }
    }

    if (action === "signup") {
      // Create the new user if OTP is verified
      const newUser = new User({
        phone_number: phone,
        first_name: firstName,
        last_name: lastName,
        isVerified: true, 
      });
      await newUser.save();

      return Response.json({ message: "Signup successful" });
    } else if (action === "login") {
      // Perform login actions
      // For example, generate JWT token and send it back to the client
      return Response.json({ message: "Login successful" });
    } else if (action === "checkout") {
      // Perform checkout actions
      return Response.json({ message: "Checkout successful" });
    } else {
      return Response.json({ error: "Invalid action" });
    }
  } catch (error) {
    console.error("Handle Auth error:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}
