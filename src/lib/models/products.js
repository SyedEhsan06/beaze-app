const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the attribute schema
const attributeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: Schema.Types.Mixed,
});


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
    attributes: [attributeSchema], 
    productId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
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
    quantity: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Products || mongoose.model('Products', productSchema);
export default Product;
