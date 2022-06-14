const { AuthenticationError } = require("apollo-server-express");
const { User, Category, Game } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            // Populate the games and categories when querying for the user who is logged in
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select("-__v -password")
                    .populate(
                        {
                            path: "games",
                            options: { sort: { "usersPlaying": -1 } },
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
            // Sorts the games in the descending order of users playing
            return await Game.find().populate("categories").sort({ usersPlaying: "desc"});
        },
        user: async (parent, { userId }) => {
            return await User.findOne({ _id: userId })
                .populate({
                    path: "games",
                    options: { sort: { "usersPlaying": -1 } },
                    populate: {
                        path: "categories"
                    }
                });
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

    // Defines the functions that will fulfill the mutations
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

                // The id of the new game that is created is also added to the User.
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { games: game._id } },
                    {
                        new: true,
                        runValidators: true
                    }
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
                    {
                        new: true,
                        runValidators: true
                    }
                );

                // Increments the number of users playing the game by 1
                await Game.findOneAndUpdate(
                    { _id: gameId },
                    { $inc: { usersPlaying: 1 } },
                    {
                        new: true,
                        runValidators: true
                    }
                );

                return user;
            }
        },
        thumbsUpGame: async (parent, { gameId }) => {
            // Increments the thumbs up of a game by 1
            return await Game.findOneAndUpdate(
                { _id: gameId },
                { $inc: { thumbsUp: 1 } },
                {
                    new: true,
                    runValidators: true
                }
            );
        },
        thumbsDownGame: async (parent, { gameId }) => {
            // Increments the thumbs down of a game by 1
            return await Game.findOneAndUpdate(
                { _id: gameId },
                { $inc: { thumbsDown: 1 } },
                {
                    new: true,
                    runValidators: true
                }
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
        removeGameFromUser: async (parent, { gameId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { games: gameId } },
                    {
                        new: true,
                        runValidators: true
                    }
                );

                // Decreases the number of users playing the game by 1
                await Game.findOneAndUpdate(
                    { _id: gameId },
                    { $inc: { usersPlaying: -1 } },
                    {
                        new: true,
                        runValidators: true
                    }
                );

                return updatedUser;
            }
            throw new AuthenticationError("You can't do this");
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
        },
    }
};

module.exports = resolvers;