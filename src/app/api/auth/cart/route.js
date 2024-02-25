//cart
import User from "@/lib/models/user.model";

export async function POST(req) {
    const {
        userId,
        productId,
        quantity,
        price,
    }= await req.json();
    try {
        let user = await User.findOne({ _id: userId });
        if (!user) {
            return Response.json({ message: "User not found" });
        } else {
            user.cart.push({
                productId,
                quantity,
                price
            });
            await user.save();
            return Response.json({ message: "Product added to cart" });
        }
    } catch (error) {
        console.error("Cart error:", error);
        return Response.json({ error: "Internal Server Error" });
    }
}

// delete product from cart
export async function DELETE(req) {
    const {
        userId,
        productId,
    }= await req.json();
    try {
        let user
        user = await User.findOne({ _id: userId });
        if (!user) {
            return Response.json({ message: "User not found" });
        } else {
            user.cart = user.cart.filter((item) => item.productId !== productId);
            await user.save();
            return Response.json({ message: "Product removed from cart" });
        }
    } 
    catch (error) {
        console.error("Cart error:", error);
        return Response.json({ error: "Internal Server Error" });
    }
}
//update product quantity in cart
// Clear user's cart
export async function DELETE(req) {
    const { userId } = await req.json();
    try {
        let user = await User.findOne({ _id: userId });
        if (!user) {
            return Response.json({ message: "User not found" });
        } else {
            user.cart = [];
            await user.save();
            return Response.json({ message: "Cart cleared successfully" });
        }
    } catch (error) {
        console.error("Cart error:", error);
        return Response.json({ error: "Internal Server Error" });
    }
}
// get user's cart
export async function GET(req) {
    const { userId } = await req.json();
    try {
        let user = await User.findOne({ _id: userId });
        if (!user) {
            return Response.json({ message: "User not found" });
        } else {
            return Response.json({ cart: user.cart });
        }
    } catch (error) {
        console.error("Cart error:", error);
        return Response.json({ error: "Internal Server Error" });
    }
}