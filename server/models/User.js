const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');
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
                ref: "Game"
            }
        ]
    }
);

/* HASH PASSWORD */
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

/* COMPARE PASSWORD TO LOG IN */
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Uses mongoose.model to create a model named user, based on schema named userSchema
const User = model("User", userSchema);

module.exports = User;