const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  productId: {
    type: String,
  },
  title: {
    type: String,
  },
  images: {
    type: [String],
  },
  quantity: {
    type: Number,
  },
  pquantity: {
    type: Number,
  },
  color: {
    type: String,
  },
  size: {
    type: Number,
  },
  price: {
    type: Number,
  },
  selectedQty: {
    type: Number,
  },
});

const addressSchema = new Schema({
  address_line1: String,
  address_line2: String,
  city: String,
  state: String,
  pincode: String,
  address_type: {
    type: String,
    enum: ["home", "work", "other"],
    default: "home",
  },
  addressId: String,
});

const orderSchema = new Schema({
  phone: {
    type: String,
    required: true,
  },
  first_name: String,
  last_name: String,
  shipping_address: addressSchema,
  billing_address: addressSchema,
  cart: [cartSchema],
  total: Number,
  payment: String,
  paymentStatus: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  status: {
    type: String,
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
