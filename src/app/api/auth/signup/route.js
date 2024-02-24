// signup.js

// Import necessary modules
import { sendOTP } from "@/utils/verifyOtpUtils";
import User from "@/lib/models/user.model";
import { connectToDb } from "@/lib/utils";

// Export the POST request handler for signup
export async function POST(req) {
  const { phone, firstName, lastName } = await req.json();

  try {
    // Check if a user with the provided phone number exists
    const existingUser = await User.findOne({ phone_number: phone });

    if (existingUser) {
      // If user exists, generate and send OTP
      const { otp, expiration } = await sendOTP(phone);

      // Update the existing user's OTP and expiration
      existingUser.otp = { code: otp.toString(), expiration };
      existingUser.isVerified = false; // Set isVerified to false initially
      await existingUser.save();

      // Return the result to the client
      return Response.json({ message: "OTP sent for verification" });
    } else {
      // If user does not exist, create a new user and send OTP
      const { otp, expiration } = await sendOTP(phone);

      // Create the new user with phone number, first name, last name, and OTP
      const newUser = new User({
        phone_number: phone,
        first_name: firstName,
        last_name: lastName,
        otp: { code: otp.toString(), expiration },
        isVerified: false, // Set isVerified to false initially
      });

      // Save the new user to the database
      await newUser.save();

      // Return the result to the client
      return Response.json({ message: "OTP sent for verification" });
    }
  } catch (error) {
    console.error("Signup error:", error);
    return Response.json({ error: "Internal Server Error" });
  } 
}
