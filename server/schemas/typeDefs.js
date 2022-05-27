const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    games: [Game]
}

type Category {
    _id: ID
    categoryName: String
}

type Game {
    _id: ID
    gameName: String
    description: String
    usersPlaying: Int
    thumbsUp: Int
    thumbsDown: Int
    categories: [Category]
    reviews: [Review]
}
    
type Review {
    reviewId: ID
    reviewBody: String
    username: String
    createdAt: String
}
    
type Auth {
    token: ID!
    user: User!
}
    
type Query {
    categories: [Category]
    games: [Game]
    user(id: ID!): User
    users(games: ID): [User]
    category(id: ID!): Category
    game(_id: ID!): Game
    me: User
}
    
type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createGame(gameName: String!, description: String!, categories: [ID]!): Game  
    addGameToUser(userId: ID!, gameId: ID!): User
    thumbsUpGame(gameId: ID!): Game
    thumbsDownGame(gameId: ID!): Game
    addReview(gameId: ID!, reviewBody: String!): Game
    removeReview(gameId: ID!, reviewId: ID!): Game
}
`;

module.exports = typeDefs;