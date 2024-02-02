const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filterSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
});

const subcategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["explore", "best"],
    },
    showOnHomepage: {
        type: Boolean,
        default: false,
    },
    filters: [filterSchema], 
});

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["explore", "best"],
    },
    showOnHomepage: {
        type: Boolean,
        default: false,
    },
    subcategories: [subcategorySchema],
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
module.exports = Category;
