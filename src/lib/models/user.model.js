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
        enum: ["home", "work", "other"],
        default: "home",
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
    address: [
        {
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
                enum: ["home", "work", "other"],
                default: "home",
            },
            addressId: {
                type: String,
            },
        }
    ], 
    cart: [cartSchema],
});

const User = mongoose?.models.User || mongoose?.model("User", userSchema);
module.exports = User;