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