import { sendOTP } from "@/utils/verifyOtpUtils";

export async function POST(req) {
    let { phone} = await req.json();

    try {
        const { otp, expiration } = await sendOTP(phone);

        return Response.json({ message: "OTP sent for verification" });
    } catch (error) {
        console.error("Send OTP error:", error);
        return Response.json({ error: "Internal Server Error" });
    }
}