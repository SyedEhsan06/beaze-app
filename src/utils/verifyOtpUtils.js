
import twilio from "twilio";
import { connectToDb } from "../lib/utils"; // Import your database connection function

// Twilio configuration
const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  verifySid: process.env.TWILIO_VERIFIED_SID, // Verify Service SID
};

const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

// Function to send OTP using Twilio Verify service
// Function to send OTP using Twilio Verify service
export async function sendOTP(phone) {
  try {
    await connectToDb();

    // Send OTP via Twilio Verify service
    const verification = await client.verify
      .v2.services(twilioConfig.verifySid)
      .verifications.create({ to: phone, channel: "sms" });

    console.log(verification.status);
    console.log(verification)
    if (verification.status === "pending") {
      const otp =  Math.floor(100000 + Math.random() * 900000); 
      const expiration = new Date().getTime() + 600000; 
      console.log("OTP sent successfully:", otp, expiration);

      return { isOTPSent: true, otp, expiration };
    } else {
      console.error("Failed to send OTP");
      return { isOTPSent: false, otp: null, expiration: null };
    }
  } catch (error) {
    console.error("Send OTP error:", error);
    throw new Error("Failed to send OTP");
  }
}

// Function to verify OTP using Twilio Verify service
export async function verifyOTP(phone, otp) {
  try {
    await connectToDb();

    // Verify OTP via Twilio Verify service
    const verificationCheck = await client.verify
      .v2.services(twilioConfig.verifySid)
      .verificationChecks.create({ to: phone, code: otp });

    console.log(verificationCheck.status); // Log verification status
    return verificationCheck.status === "approved"; // Return true if OTP is verified successfully
  } catch (error) {
    console.error("Verify OTP error:", error);
    throw new Error("Failed to verify OTP");
  }
}
