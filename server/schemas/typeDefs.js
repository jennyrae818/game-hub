const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID!,
        username: String!,
        email: String!,
        password: String!,
        games: [Game]
    }

    type Category {
        _id: ID,
        categoryName: String
    }

    type Game {
        _id: ID,
        gameName: String,
        description: String,
        usersPlaying: Number,
        thumbsUp: Number,
        thumbsDown: Number,
        categories: [Category],
        reviews: [Review]
    }

    type Review {
        reviewId: ID,
        reviewBody: String,
        username: String,
        createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        categories: [Category]
        games: [Game]
        user(id: ID!): User
        category(id: ID!): Category
        game(id: ID!): Game
    }

    type Mutation {
        createGame(gameName: String!, description: String!, categories: [Category]!): Game
        CreateUser(username: String!, email: String!, password: String!): User
        addGameToUser(userId: ID!, gameId: ID!): User
        UpdateGame(gameId: ID!, usersPlaying: Number, thumbsUp: Number, thumbsDown: Number): Game
        addReview(gameId: ID!, reviewBody: String!, username: String!): Game
        removeReview(gameId: ID!, reviewId: ID!): Game
    }
`;

module.exports = typeDefs;