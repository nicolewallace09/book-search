const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // get a single user by either their id or their username
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ })
                .select('__v -password')
                .populate('books')

                return userData; 
            }
            throw new AuthenticationError('You are not logged in')
        }
    },
    Mutation: {
        // create a new user 
        addUser: async (parents, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user }
        },
        // login a user 
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user)

            return { token, user };
        },
        // save books to array
        saveBook: async (parent, { input }, context) => {
            if(context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input }},
                    { new: true }
                )
            return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in')
        },
        // remove books from array 
        removeBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id }, 
                    { $pull: { savedBooks: { bookId: args.bookId }}},
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in')
        }
    }
};

module.exports = resolvers; 