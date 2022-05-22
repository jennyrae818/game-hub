import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_GAME = gql`
  mutation createGame($gameName: String!, $description: String!, $categories: [Category]!) {
    createGame(gameName: $gameName, description: $description, categories: $categories) {
      _id
      gameName
      description
      categories
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($gameId: ID!, $reviewBody: String!) {
    addReview(gameId: $gameId, reviewBody: $reviewBody) {
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

export const REMOVE_REVIEW = gql`
  mutation removeReview($gameId: ID!, $reviewBody: String!) {
    removeReview(gameId: $gameId, reviewBody: $reviewBody) {
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

export const ADD_GAME_TO_USER = gql`
  mutation addGameToUser($userId: ID!, $gameId: ID!) {
    addGameToUser(userId: $userId, gameId: $gameId) {
      _id
      username
      games
    }
  }
`;

export const THUMBSUP_GAME = gql`
  mutation thumbsUpGame($gameId: ID!) {
    thumbsUpGame(gameId: $gameId) {
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

export const THUMBSDOWN_GAME = gql`
  mutation thumbsDownGame($gameId: ID!) {
    thumbsDownGame(gameId: $gameId) {
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