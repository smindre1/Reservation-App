const { User, Reservation, Calendar, Schedule } = require("../models");
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
      return Reservation.find().populate("services");
    },
    reservation: async (parent, { reservationId }) => {
      return Reservation.findById(reservationId);
    },
    schedule: async (parent, { year, month, day }) => {
      const schedule = await Schedule.findOne({year});

      if(!schedule) {
        throw new Error('Schedule Not Found!');
      }

      const monthData = schedule[month];

      if(!monthData) {
        throw new Error('Month Not Found!');
      }

      const dayPlans = monthData.find((dayPlan) => dayPlan.day == day);
      if(!dayPlans) {
        throw new Error('Day Not Found!');
      }

      const availableTimeSlots = dayPlans.timeSlots.filter((timeSlot) => timeSlot.available == true);


      return availableTimeSlots;
    },
    calendar: async () => {
      return await Calendar.find();
    },
  },

  Mutation: {
    addUser: async (parent, { fullName, email, phone, password, position }) => {
      const user = await User.create({ fullName, email, phone, password, position });
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
    deleteUser: async (parent, { userId }) => {
      const user = await User.findOneAndDelete({
          _id: userId,
        });
      return user;
    },
    login: async (parent, { phone = null, email = null, password }) => {
      var user;
      //It will check if a phone number is provided, if not it will search based on the email input.
      phone ? user = await User.findOne({ phone }) : user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        console("Incorrect Password");
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    addReservation: async (parent, { name, email, phone, day, appointmentTime, services, specialRequests, payment }) => {
      const reservation = await Reservation.create({ name, email, phone, day, appointmentTime, services, specialRequests, payment });
      return reservation;
    },
    updateReservation: async (parent, context) => {
      if (context.reservation) {
        const reservation = await Reservation.findOneAndUpdate(
          { _id: context.reservation.reservationId },
          context.reservation );

        return reservation;
      }
    },
    cancelReservation: async (parent, { reservationId }) => {
      const reservation = await Reservation.findOneAndDelete({
          _id: reservationId,
        });
      return reservation;
    },
    addCalendarYear: async (parent, { year, January, February, March, April, May, June, July, August, September, October, November, December }) => {
      const schedule = await Schedule.create({ year, January, February, March, April, May, June, July, August, September, October, November, December });
      return schedule;
    },
    addScheduleYear: async (parent, { year, January, February, March, April, May, June, July, August, September, October, November, December }) => {
      const schedule = await Schedule.create({ year, January, February, March, April, May, June, July, August, September, October, November, December });
      return schedule;
    },
  },
};

// module.exports = {
//   JSON: JSONScalar, resolvers: resolvers
// };
module.exports = resolvers;
