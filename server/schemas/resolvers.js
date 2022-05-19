const { AuthenticationError } = require("apollo-server-express");
const { User, Category, Game, Review } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        categories: async () => {
            return await Category .find();
        },
        games: async () => {
            return await Game.find().populate(categories);
        },
        user: async (parent, { username }) => {
            return await User.findOne({ username }).populate(games);
        },
        category: async (parent, { categoryId }) => {
            return await Category.findOne({ _id: categoryId })
        },
        game: async (parent, { gameId }) => {
            return await Game.findOne({ _id: gameId }).populate(reviews); 
        },
    },

    Mutation: {
       
    }
}

module.exports = resolvers;