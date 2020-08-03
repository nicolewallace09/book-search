import gql from 'graphql-tag';

// mutation for logged in user
export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
            user {
                _id
                username
                email
                bookCount
                savedBooks {
                    bookId
                    title
                    description
                    authors
                    link
                    image
        }
      }
    }
  }
`;

// mutation for user to sign up 
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
            user {
                _id
                username
                email
                bookCount 
                savedBooks {
                    bookId
                    title
                    description
                    authors
                    image
                    link
                }
            }
        }
    }
`;

// mutation to save books
export const SAVE_BOOK = gql`
    mutation saveBook($input: savedBook!) {
        saveBook(input: $input) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                description
                authors
                image
                link
            }
        }
    }
`;

// mutation to remove books
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                description
                authors
                image
                link
            }
        }
    }
`;