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

// Export the POST request handler for signup
export async function POST(req) {
  const { phone, firstName, lastName } = await req.json();

  try {
    await connectToDb();

    // Generate and send OTP
    const { code: otp, expiration } = await sendOTP(phone);

    // Return the OTP to the client for verification
    return Response.json({ otp, expiration });
  } catch (error) {
    console.error("Signup error:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}
