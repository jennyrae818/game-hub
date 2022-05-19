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
       CreateUser: async (parent, { username, email, password }) => {
           const user = await User.create({ username, email, password });
           const token = signToken(user);
           return { token, user };
       },
       login: async (parent, { email, password }) => {
           const user= await User.findOne({ email });

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
       createGame: {
           
       }
    }
}

module.exports = resolvers;