// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
// ADD_USER will execute the addUser mutation.
// SAVE_BOOK will execute the saveBook mutation.
// REMOVE_BOOK will execute the removeBook mutatation.

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

export const ADD_USER = gql`

mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks{
          authors
          bookId
          title
          description
          image
          link
        }
      }
    }
  }

`;

export const SAVE_BOOK = gql`

mutation saveBook($bookId: String!, $description: String!, $title: String! $authors: [String], $image: String, $link: String) {
    saveBook(bookId: $bookId, description: $description, title: $title authors: $authors, image: $image, link: $link) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`

mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;