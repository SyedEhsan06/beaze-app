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
    type: String,
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
    default: "home",
  },
  addressId: String,
});

const orderSchema = new Schema({
  phone: String,
  first_name: String,
  last_name: String,
  shipping_address: addressSchema,
  billing_address: addressSchema,
  cart: [cartSchema],
  total: Number,
  payment: String,
  paymentStatus: {
    type: String,
    default: "pending",
  },
  status: {
    type: String,
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
module.exports = Order;
