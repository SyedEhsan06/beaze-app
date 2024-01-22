    const mongoose = require("mongoose");
    let Schema = mongoose.Schema;

    const subcategorySchema = new Schema({
        name:{
            type: String,
            required: true,
        },
        img:{
            type: String,
            required: true,
        },
    }); 

    const categorySchema = new Schema({
        name:{
            type: String,
            required: true,
            unique: true,
        },
        img:{
            type: String,
            required: true,
        },
        subcategories: [subcategorySchema],
    });
    const Category = mongoose.model("Category", categorySchema);
    module.exports = Category;
