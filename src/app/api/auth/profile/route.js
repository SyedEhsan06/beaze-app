import jwt from "jsonwebtoken";
import User from "@/lib/models/user.model";

const secret = process.env.SECRET;

export async function GET(req) {
  // Extract JWT from the request headers

  // const token = req.headers.authorization?.replace("Bearer ", "");
  let authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return Response.json({ error: "Authorization token not provided" }, { status: 401 });
  }
  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return Response.json({ error: "Authorization token not provided" }, { status: 401 });
  }

  try {
    // Verify the JWT
    const decodedToken = jwt.verify(token, secret);

    // Extract user information from the decoded token
    const { phone } = decodedToken;

    // Retrieve user data from the database
    const user = await User.findOne({ phone_number: phone });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Return user data
    return Response.json({ user });
  } catch (error) {
    console.error("Profile retrieval error:", error);
    return Response.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
