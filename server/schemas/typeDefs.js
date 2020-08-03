// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`

input savedBook {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    _id: ID
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: booksInput): User
    removeBook(bookId: String!): User
}

type Auth {
    token: ID!
    user: User
}
`;

// export the typeDef
module.exports = typeDefs; 