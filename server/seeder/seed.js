const db = require('../config/connection');
const { Calendar, Schedule } = require('../models');
// import { defaultTimeSlots } from './timeSlots.js';
const defaultTimeSlots = require('./timeSlots');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

//This function builds the data object for a specific year to be used for the Calendar model
const buildCalendarYear = (year) => {
  let builtYear = {year};
  let leapYear;
  year % 4 > 0 ? leapYear = false : leapYear = true;
  months.forEach((month) => {
    let numOfDays;
    //Checks which month (and if it's a leap year) and establishes a number of days allocated to that month
    if(month == 'January' || month == 'March' || month == 'May' || month == 'July' || month == 'August' || month == 'October' || month == 'December') {
      numOfDays = 31;
    } else if( month == 'February' ) {
      leapYear ? numOfDays = 29 : numOfDays = 28;
    } else {
      numOfDays = 30;
    }
    const firstDay = new Date(year, months.indexOf(month), 1);
    const weekdayIndex = firstDay.getDay();
    const finishedMonth = buildCalendarMonth(numOfDays, weekdayIndex);
    builtYear[month] = finishedMonth;
  });
  return builtYear;
}

//This function creates an array of objects representing each indiidual day for a specific month's traits
//'iterations' represent the number of days in the month
//'weekday' represents the day of the week that belongs to the first day of the specific month
const buildCalendarMonth = (iterations, weekday) => {
  const month = [];
  for(let i = 1; i < iterations + 1; i++) {
    const buildDay = {
      day: i,
      weekday: weekday,
      open: true,
    };
    weekday == 6 ? weekday = 0 : weekday = weekday + 1;
    month.push(buildDay);
  }
  return month;
}

//Builds a calendar consisting of 5 years starting from the current year
const buildCalendar = async () => {
  let count = currentYear;
  for(i = 0; i < 5; i++) {
    let newYear = buildCalendarYear(count);
    await Calendar.create(newYear);
    count = count + 1;
  }
}

//This function builds the data object for a specific year to be used for the Schedule model
const buildScheduleYear = (year) => {
  let builtYear = {year};
  let leapYear;
  year % 4 > 0 ? leapYear = false : leapYear = true;
  months.forEach((month) => {
    let numOfDays;
    //Checks which month (and if it's a leap year) and establishes a number of days allocated to that month
    if(month == 'January' || month == 'March' || month == 'May' || month == 'July' || month == 'August' || month == 'October' || month == 'December') {
      numOfDays = 31;
    } else if( month == 'February' ) {
      leapYear ? numOfDays = 29 : numOfDays = 28;
    } else {
      numOfDays = 30;
    }
    const firstDay = new Date(year, months.indexOf(month), 1);
    const weekdayIndex = firstDay.getDay();
    const finishedMonth = buildScheduleMonth(numOfDays, weekdayIndex);
    builtYear[month] = finishedMonth;
  });
  return builtYear;
}

const buildScheduleMonth = (iterations, weekday) => {
  const month = [];
  for(let i = 1; i < iterations + 1; i++) {
    const buildDay = {
      day: i,
      timeSlots: defaultTimeSlots
    };
    weekday == 6 ? weekday = 0 : weekday = weekday + 1;
    month.push(buildDay);
  }
  return month;
}

//Builds a schedule consisting of 5 years starting from the current year
const buildSchedule = async () => {
  let count = currentYear;
  for(i = 0; i < 5; i++) {
    let newYear = buildScheduleYear(count);
    await Schedule.create(newYear);
    count = count + 1;
  }
}


//Process exit code 1 means failure, 0 means success
db.once('open', async () => {
  try {
    // Calendar.find() ? console.log('The Calendar has already been seeded') : await buildCalendar();
    // Schedule.find() ? console.log('The Schedule has already been seeded') : await buildSchedule();

    // const testing = Schedule.find();
    // console.log(testing[0], "Test");
    // testing[0] ? console.log("Stuff") : console.log("nothing");
    await buildCalendar();
    await buildSchedule();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});