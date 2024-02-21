const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address",
    },
    cart: {
        type: [Schema.Types.ObjectId],
        ref: "Cart",
    },
    total: {
        type: Number,
        required: true,
    },
    payment: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ["pending", "success", "failed"],
        default: "pending",
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
module.exports = Order;