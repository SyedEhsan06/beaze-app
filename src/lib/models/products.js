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
      
    },
    images: {
      type: [String],
      
    },
    subcategory: {
      type: String,
    },
    category: {
      type: String,
      
    },
    attributes: [attributeSchema], 
    productId: {
      type: String,
      
    },
    price: {
      type: Number,
      
    },
    description: {
      type: String,
      
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
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Products || mongoose.model('Products', productSchema);
export default Product;
