const { Schema, model } = require("mongoose");
const reviewSchema = require("./Review");

// Schema to create game model
const gameSchema = new Schema(
    {
        gameName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 100
        },
        description: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 400
        },
        // No of users who have added this game to their profile
        usersPlaying: {
            type: Number,
            required: true,
            default: 1
        },
        thumbsUp: {
            type: Number,
            default: 0
        },
        thumbsDown: {
            type: Number,
            default: 0
        },
        categories: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Category"
            }
        ],
        // Reviews
        reviews: [reviewSchema]
    },
    {
        // To include virtuals in the response
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Creates a virtual named rating that retrieves the rating of the game on query
gameSchema.virtual('rating')
    .get(function() {
        return this.thumbsUp * 100 / this.usersPlaying;
    });

// Uses mongoose.model to create a model named Game, based on schema named gameSchema
const Game = model("Game", gameSchema);

module.exports = Game;