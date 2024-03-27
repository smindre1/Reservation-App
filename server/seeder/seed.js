const db = require('../config/connection');
const { Schedule } = require('../models');

//Fill in the year const with a function
const year = []


//Process exit code 1 means failure, 0 means success
db.once('open', async () => {
  try {
    await Schedule.create(year);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});