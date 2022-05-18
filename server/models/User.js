const { Schema, model } = require("mongoose");

// Schema to create a user model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Please enter a valid email"]
        },
        password: {
            type: String,
            required: true,
            minlength: [8, "Password must have a minimum of 8 characters"]
        },
        games: [
            {
                type: Schema.Types.ObjectId,
                ref: "game"
            }
        ]
    }
);

// Uses mongoose.model to create a model named user, based on schema named userSchema
const User = model("user", userSchema);

module.exports = User;