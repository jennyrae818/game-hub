import { gql } from "@apollo/client";

export const QUERY_SINGLE_USER = gql`
    query singleUser($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            games
        }
    }
`;

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            games
        }
    }
`;

export const QUERY_GAMES = gql`
query getGames {
        games {
            _id
            gameName
            usersPlaying
            thumbsUp
            thumbsDown
            categories {
                _id
                categoryName
              }
        }
    }
`;

export const QUERY_SINGLE_GAME = gql`
    query getSingleGame($gameId: ID!) {
        game(gameId: $gameId) {
            _id
            gameName
            description
            usersPlaying
            thumbsUp
            thumbsDown
            categories
            reviews
        }
    }
`;

export const QUERY_CATEGORIES = gql`
    query getCategories {
        categories {
            _id
            categoryName
        }
    }
`;

export const QUERY_SINGLE_CATEGORY = gql`
    query getSingleCategory($categoryId: ID!) {
        category(categoryId: $categoryId) {
            _id
            categoryName
        }
    }
`;

