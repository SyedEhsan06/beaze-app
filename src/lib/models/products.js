const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory',
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shipping: {
    type: Boolean,
    default: true,
  },
  tax: {
    type: Number,
    default: 0,
  },
  features: {
    type: [String],
  },
  contains: {
    type: [String],
  },
  material: {
    type: String,
  },
  type: {
    type: String,
  },
  printType: {
    type: String,
  },
  sleeve: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
