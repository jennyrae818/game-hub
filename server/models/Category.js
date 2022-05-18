const { Schema, Types } = require("mongoose");

const categorySchema = new Schema(
    {
        categoryName: {
            type: String,
            required: true,
        }
    }
);

const Category = model("Category", categorySchema);

module.exports = Category;