import { gql } from "@apollo/client";

export const QUERY_SINGLE_USER = gql`
    query singleUser($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            games {
                _id
                gameName
                usersPlaying
                thumbsUp
                thumbsDown
                rating
                categories {
                    _id
                    categoryName
                }
            }
        }
    }
`;

export const QUERY_GAME_USERS = gql`
query getUsers($games: ID) {
    users(games: $games) {
      _id
      username
    }
  }  
`

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            games {
                _id
                gameName
                usersPlaying
                thumbsUp
                thumbsDown
                rating
                categories {
                    _id
                    categoryName
                }
            }
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
            rating
            categories {
                _id
                categoryName
              }
        }
    }
`;

export const QUERY_SINGLE_GAME = gql`
    query getSingleGame($_id: ID!) {
        game(_id: $_id) {
            _id
            gameName
            description
            usersPlaying
            thumbsUp
            thumbsDown
            rating
            categories {
                _id
              }
            reviews {
                reviewId
                reviewBody
                user {
                    _id
                    username
                }
                createdAt
            }
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

