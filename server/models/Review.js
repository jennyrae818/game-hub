const { Schema, Types } = require("mongoose");

// This will not be a model, but rather will be used as review field's subdocument schema in the Game model.

const reviewSchema = new Schema(
    {
        reviewId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reviewBody: {
            type: String,
            required: true,
            // 300 characters maximum
            maxlength: 300
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        createdAt: {
            type: Date,
            // Sets the default value to the current timestamp
            default: Date.now,
            // Getter method to format the timestamp on query
            get: (date) => {
                if (date) {
                    return date.toLocaleDateString();
                }
            }
        }
    }
);

module.exports = reviewSchema;