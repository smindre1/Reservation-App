const { User, Reservation } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    reservations: async () => {
      return Reservation.find();
    },
    reservation: async (parent, { reservationId }) => {
      return Reservation.findById(reservationId);
    },
  },

  Mutation: {
    addUser: async (parent, { fullName, email, phone, password, position }) => {
      const user = await User.create({ fullName, email, phone, password, position });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { phone = null, email = null, password }) => {
      const key = phone || email;
      const user = await User.findOne({ key });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, context) => {
      if (context.user) {

        const user = await User.findOneAndUpdate({ _id: context.user._id }, context.user );

        return user;
      }
      throw AuthenticationError("You need to be logged in!");
    },

    addReservation: async (parent, { name, email, phone, appointmentTime, services, specialRequests, payment }) => {
      const reservation = await Reservation.create({ name, email, phone, appointmentTime, services, specialRequests, payment });
      return reservation;
    },
    cancelReservation: async (parent, { reservationId }) => {
      const reservation = await Reservation.findOneAndDelete({
          _id: reservationId,
        });
      return reservation;
    },
    updateReservation: async (parent, context) => {
      if (context.reservation) {
        const reservation = Reservation.findOneAndUpdate(
          { _id: context.reservation.reservationId },
          context.reservation );

        return reservation;
      }
    },
  },
};

module.exports = resolvers;
