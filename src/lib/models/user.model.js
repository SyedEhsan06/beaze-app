const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const addressSchema = new Schema({
    address_line1: {
        type: String,
    },
    address_line2: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    pincode: {
        type: String,
    },
    address_type: {
        type: String,
    },
    addressId: {
        type: String,
    },
});
const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    total: {
        type: Number,
    },
    cartId: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    original_price: {
        type: Number,
    },
    tax: {
        type: Number,
    },
    pquantity: {
        type: Number,
    },
    p_id: {
        type: String,
    },
    title: {
        type: String,
    },
    images: {
        type: [String],
    },

    
});

const userSchema = new Schema({
    phone_number: {
        type: String,
        unique: true,
    },
   first_name: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    otp: {
        code: {
            type: String,
        },
        expiration: {
            type: Date,
        },
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    address: [addressSchema], 
    cart: [cartSchema],
});

const User = mongoose?.models.User || mongoose?.model("User", userSchema);
export default User