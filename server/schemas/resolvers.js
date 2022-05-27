const { AuthenticationError } = require("apollo-server-express");
const { User, Category, Game } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select("-__v -password")
                    .populate(
                        {
                            path: "games",
                            populate: {
                                path: "categories"
                            }
                        });

                return userData;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        categories: async () => {
            return await Category.find();
        },
        games: async () => {
            return await Game.find().populate("categories").sort("rating");
        },
        user: async (parent, { username }) => {
            return await User.findOne({ username }).populate("games");
        },
        users: async (parent, { games }) => {
            const params = {};
            if (games) {
                params.games = games;
            }

            return await User.find(params).populate("games");
        },
        category: async (parent, { categoryId }) => {
            return await Category.findOne({ _id: categoryId });
        },
        game: async (parent, { _id }) => {
            return await Game.findById(_id).populate("reviews");
        },
    },

    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);

            return { token, user };
        },
        createGame: async (parent, { gameName, description, thumbsUp, thumbsDown, categories }, context) => {
            if (context.user) {
                const game = await Game.create({
                    gameName, description, categories, thumbsUp, thumbsDown
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { games: game._id } }
                );

                console.log(game);
                return game;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        addGameToUser: async (parent, { userId, gameId }, context) => {
            // Adds the game to user profile
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { games: gameId } },
                );
        
                // Increments the number of users playing the game by 1
                await Game.findOneAndUpdate(
                    { _id: gameId },
                    { $inc: { usersPlaying: 1 } }
                );

                return user;
            }
        },
        thumbsUpGame: async (parent, { gameId }) => {
            return await Game.findOneAndUpdate(
                { _id: gameId },
                { thumbsUp: thumbsUp + 1 }
            );
        },
        thumbsDownGame: async (parent, { gameId }) => {
            return await Game.findOneAndUpdate(
                { _id: gameId },
                { thumbsDown: thumbsDown + 1 }
            );
        },
        addReview: async (parent, { gameId, reviewBody }, context) => {
            // Adds review to a game
            if (context.user) {
                return Game.findOneAndUpdate(
                    { _id: gameId },
                    { 
                        $addToSet: {
                            reviews: { reviewBody, username: context.user.username }
                        }
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                );
            }
        },
        removeReview: async (parent, { gameId, reviewId }, context) => {
            // Removes a review from game
            if (context.user) {
                return Game.findOneAndUpdate(
                    { _id: gameId },
                    {
                        $pull: {
                            reviews: {
                                _id: reviewId,
                                username: context.user.username
                            }
                        }
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError("You need to be logged in!");
        }
    }
};

module.exports = resolvers;