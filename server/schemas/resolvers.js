// import user model
const { User } = require("../models");
// import sign token function from auth
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  // gets a single user by their id
  Query: {
    me: async (parent, arg, context) => {
      if (context.user) {
        data = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return data;
      }
      throw new AuthenticationError('Cannot find a user with this id!');
    },
  },
  Mutation: {
    //login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Can't find this user");
      }

      const correctPW = await user.isCorrectPassword(password);
      if (!correctPW) {
        throw new AuthenticationError('Wrong password!');
      }

      const token = signToken(user);

      return { token, user };
    },

    //addUser
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    //saveBook
    saveBook: async (parent, { newBook }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: newBook } },
          { new: true }
        );
        return updatedUser;
      }
    },

    //removeBook
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Couldn't find user with this id!");
    },
  },
};

module.exports = resolvers;