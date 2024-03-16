import jwt from "jsonwebtoken";
import User from "@/lib/models/user.model";
import { sendOTP, verifyOTP } from "@/utils/verifyOtpUtils";
import { connectToDb } from "@/lib/utils";

const secret = process.env.SECRET;

// Function to handle common error scenarios
function handleCommonError(message, status = 401) {
  return Response.json({ error: message }, { status });
}

export async function GET(req) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return handleCommonError("Authorization token not provided");
    }
    // const phone = req.headers.get("phone");
    const decodedToken = jwt.verify(token, secret);
    const { phone } = decodedToken;
    // const phone="+918340263940"
    const user = await User.findOne({ phone_number: phone });

    if (!user) {
      return handleCommonError("User not found", 404);
    }

    return Response.json({ user });
  } catch (error) {
    console.error("Profile retrieval error:", error);
    return handleCommonError("Invalid or expired token");
  }
}

export async function PUT(req) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return handleCommonError("Authorization token not provided");
    }

    // const decodedToken = jwt.verify(token, secret);
    // const { phone } = decodedToken;
    const phone="+918340263940"
    let user = await User.findOne({ phone_number: phone });

    if (!user) {
      return handleCommonError("User not found", 404);
    }

    const {
      first_name,
      last_name,
      phone_number,
      address_line1,
      address_line2,
      city,
      state,
      pincode,
      operation,
      addressId,
      address_type,
      otp,
      product,
      quantity,
      price,
      size,
      color,
      total,
      cartOperation,
      original_price,
      tax,
      pquantity,
      p_id,
      title,
      images,
    } = await req.json();
    if (phone_number) {
      const { isOTPSent, sentOTP, otpExpiration } = await sendOTP(phone_number);

      if (!isOTPSent) {
        return handleCommonError("Failed to send OTP", 500);
      }

      const isOTPSuccess = await verifyOTP(phone_number, otp);

      if (!isOTPSuccess) {
        return handleCommonError("Invalid OTP", 400);
      }
    }

    let address = {
      address_line1,
      address_line2,
      city,
      state,
      pincode,
      addressId,
      address_type,
    };
    
// console.log('address',address)
    switch (operation) {
      case "add":
      await  user.address.push(address);
        break;
      case "edit":
        const editedAddressIndex = user.address.findIndex(
          (addr) => addr.addressId === addressId
        );
        if (editedAddressIndex !== -1) {
          user.address[editedAddressIndex] = { ...address };
        }
        break;
        case "delete":
          await user.address.pull(addressId);
          console.log('user.address',user.address)
          

          break;
      
      default:
        break;
    }

    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (phone_number) user.phone_number = phone_number;
    switch (cartOperation) {
      case "add":
        user.cart.push({
          product,
          quantity,
          pquantity,
          images,
          price,
          size,
          color,
            p_id,
          total,
          original_price,
          tax,
        });
        break;
      case "edit":
        const editedProductIndex = user.cart.findIndex(
          (item) => item._id === p_id
        );
        if (editedProductIndex !== -1) {
          user.cart[editedProductIndex] = {
            product,
            quantity: pquantity,
            price,
            size,
            color,
            total,
            original_price,
            tax,
          };
        }
        break;
      case "delete":
        await user.cart.pull(_id);
        break;
      default:
        break;
    }
    await user.save();
  
    return Response.json({ user });
  } catch (error) {
    console.error("Profile update error:", error);
    return handleCommonError("Invalid or expired token");
  }
}
