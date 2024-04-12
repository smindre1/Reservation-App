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
    getCalendarMonth: async (parent, { year, month }) => {
      const calendar = await Calendar.findOne({year});
      if(!calendar) {
        throw new Error('Calendar Not Found!');
      }

      const monthData = calendar[month];
      if(!monthData) {
        throw new Error('Month Not Found!');
      }

      return monthData;
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
      const schedule = await Calendar.create({ year, January, February, March, April, May, June, July, August, September, October, November, December });
      return schedule;
    },
    addScheduleYear: async (parent, { year, January, February, March, April, May, June, July, August, September, October, November, December }) => {
      const schedule = await Schedule.create({ year, January, February, March, April, May, June, July, August, September, October, November, December });
      return schedule;
    },
    calendarDayOpenStatus: async (parent, { year, month, day, open }) => {
      //Finds the calendar year
      let calendar = await Calendar.find({year});
      //Creates an array with the specific day of the month targeted to have it's open status changed (to either true or false)
      let updatedMonth = calendar[0][month].map((days) => {
        days.day == day ? days.open = open : days;
        return days;
      });
      const updatedCalendar = await Calendar.findOneAndUpdate({ year }, {[month]: updatedMonth});
      return updatedCalendar;
    },
    updateScheduleDay: async (parent, { year, month, day, openingTime, closingTime }) => {
      const schedule = await Schedule.findOne({year});

      if(!schedule) {
        throw new Error('Schedule Not Found!');
      }

      let monthData = schedule[month];

      if(!monthData) {
        throw new Error('Month Not Found!');
      }

      let dayPlans = monthData.find((dayPlan) => dayPlan.day == day);
      if(!dayPlans) {
        throw new Error('Day Not Found!');
      }

      dayPlans.timeSlots.map((timeSlot) => {
        if(timeSlot.time < openingTime || timeSlot.time > closingTime) {
          timeSlot.available = false;
        } else {
          timeSlot.available = true;
        }
      });

      monthData[day-1].timeSlots = dayPlans.timeSlots;

      const updatedSchedule = await Schedule.findOneAndUpdate({ year }, {[month]: monthData});
      return updatedSchedule;
    },
    calendarWeekdays: async (parent, { Sun, Mon, Tue, Wed, Thu, Fri, Sat }) => {
      let calendar = await Calendar.find();
      let calendarMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
      const updateMonth = async (month) => {
        const newMonth = [];
        for(let i=0; i < month.length; i++) {
          let reformedDay = {day: month[i].day, weekday: month[i].weekday, open: month[i].open};
          newMonth.push(reformedDay);
        }
        
        //Looping through each day of the month
        newMonth.map((day) => {
          if(day.weekday == 0) {
            day.open = Sun;
          } else if(day.weekday == 1) {
            day.open = Mon;
          } else if(day.weekday == 2) {
            day.open = Tue;
          } else if(day.weekday == 3) {
            day.open = Wed;
          } else if(day.weekday == 4) {
            day.open = Thu;
          } else if(day.weekday == 5) {
            day.open = Fri;
          } else {
            day.open = Sat;
          }
          let newDay = {day: day.day, weekday: day.weekday, open: day.open, test: "why"}
          return newDay;
        })
        return newMonth;
      }

      const updateYear = async (months) => {
        let updatedMonths = {};
        //Looping through each month of the year
        for(let i=0; i < months.length; i++) {
          let month = months[i];
          const newMonth = await updateMonth(month);
          updatedMonths[calendarMonths[i]] = newMonth;
        }
        return updatedMonths;
      }

      //Looping through each year
      for(let i=0; i < calendar.length; i++) {
        let year = calendar[i].year;
        let {January, February, March, April, May, June, July, August, September, October, November, December} = calendar[i];
        let months = [January, February, March, April, May, June, July, August, September, October, November, December];
        const newYear = await updateYear(months);
        await Calendar.findOneAndUpdate({ year }, newYear);
      }
      
      // return updatedCalendar;
    },

  },
};

// module.exports = {
//   JSON: JSONScalar, resolvers: resolvers
// };
module.exports = resolvers;
