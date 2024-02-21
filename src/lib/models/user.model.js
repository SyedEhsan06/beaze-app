const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const addressSchema = new Schema({
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
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
        required: true,
    },
});
const userSchema = new Schema({
    phone_number: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
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

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;