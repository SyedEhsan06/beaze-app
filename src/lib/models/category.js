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
        type: {
            type: String,
            required: true,
            enum: ["teaze", "explore", "best"],
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
        type: {
            type: String,
            required: true,
            enum: ["teaze", "explore", "best"],
        },
        subcategories: [subcategorySchema],
    });

    // const Category = mongoose.model("Category", categorySchema);
    const Category =  mongoose?.models.Category || mongoose.model("Category", categorySchema);
    module.exports = Category;

