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
        reviewbody: String,
        username: String,
        createdAt: String
    }
`;

module.exports = typeDefs;