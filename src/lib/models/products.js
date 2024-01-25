const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    subcategory: {
      type: String,
    },
    category: {
      type: String,
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
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    features: {
      type: [
        {
          title: String,
          description: String,
        },
      ],
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
    teaze: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
      default:5,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Products', productSchema);

module.exports = Product;
