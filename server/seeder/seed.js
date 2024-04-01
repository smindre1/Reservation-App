const db = require('../config/connection');
const { Schedule } = require('../models');
// import { defaultTimeSlots } from './timeSlots.js';
const defaultTimeSlots = require('./timeSlots');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

//Fill in the year const with a function
const days = [{day: 1, weekday: 'monday', open: false, timeSlots: { time: '12am', available: true}}]

//This function builds the data object for a specific year to be used for the Schedule model
const buildYear = (year) => {
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
    const finishedMonth = buildMonth(numOfDays, weekdayIndex);
    builtYear[month] = finishedMonth;
  });
  return builtYear;
}

//This function creates an array of objects representing each indiidual day for a specific month's traits
//'iterations' represent the number of days in the month
//'weekday' represents the day of the week that belongs to the first day of the specific month
const buildMonth = (iterations, weekday) => {
  let weekdayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const month = [];
  for(let i = 1; i < iterations + 1; i++) {
    const buildDay = {
      day: i,
      weekday: weekdayIndex[weekday],
      open: true,
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
    let newYear = buildYear(count);
    await Schedule.create(newYear);
    count = count + 1;
  }

}

//Process exit code 1 means failure, 0 means success
db.once('open', async () => {
  try {
    Schedule.find() ? console.log('The Schedule has already been seeded') : await buildSchedule();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});