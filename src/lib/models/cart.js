import mongoose from "mongoose";
const { Schema } = mongoose;

const attributesSchema = new Schema({   
    size: {
        type: String,
    },
    color: {
        type: String,
    },
});

const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    quantity: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
    },
    attributes: [attributesSchema],
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;
