# Reservation-App
Created By Shane Mindreau.


### To Do:
- The React HTML file needs a favicon/browser icon.
    - The public/vite.svg directory and file can be deleted once the icon is updated.
- The React README.md file should be updated.
- When deploying on netlify, don't forget to add the netlify configurations for react router dom (multiple webpages).
- Update the token secret in the auth.js file from the /server/utils directory.

-get rid of the success useState in the Signup file.
-update the Error txt messages (email and phone number) for the login form.

-double check all Auth imports.

-Add services and payment(default) to ReservationForm.jsx.

-Add validators to the models/seed.js file to check if pre-existing data is present before seeding.

To Learn More About GraphQL:
https://www.apollographql.com/tutorials/lift-off-part4/02-what-is-a-mutation

```
          addYear(year: Int!, January: [Days]!, February: [Days]!, March: [Days]!, April: [Days]!, May: [Days]!, June: [Days]!, July: [Days]!, August: [Days]!, September: [Days]!, October: [Days]!, November: [Days]!, December: [Days]!): Schedule

          
  
```

### Models:

- Calendar:
Weekday: This is a key that holds a number from 0 to 6, representing Sunday to Saturday.
```
weekdayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
````

- Schedule:

TimeSlots: Timeslots is an array of objects, each object containing 2 key value pairs which are 'time' and 'available'. The 'available' simply denotes if a specific time is available for booking/reserving, using a boolean value. The 'time' holds a number ranging from 0 to 93, representing each 15 minute interval in a 24 hour day. The following is a key for what each number used for 'time' represents:
```
const timeslotIndex = { 0: '12:00AM', 1: '12:15AM', 2: '12:30AM', 3: '12:45AM', 4: '01:00AM', 5: '01:15AM', 6: '01:30AM', 7: '01:45AM', 8: '02:00AM', 9: '02:15AM', 10: '02:30AM', 11: '02:45AM', 12: '03:00AM', 13: '03:15AM', 14: '03:30AM', 15: '03:45AM', 16: '04:00AM', 17: '04:15AM', 18: '04:30AM', 19: '04:45AM', 20: '05:00AM', 21: '05:15AM', 22: '05:30AM', 23: '05:45AM', 24: '06:00AM', 25: '06:15AM', 26: '06:30AM', 27: '06:45AM', 28: '07:00AM', 29: '07:15AM', 30: '07:30AM', 31: '07:45AM', 32: '08:00AM', 33: '08:15AM', 34: '08:30AM', 35: '08:45AM', 36: '09:00AM', 37: '09:15AM', 38: '09:30AM', 39: '09:45AM', 40: '10:00AM', 41: '10:15AM', 42: '10:30AM', 43: '10:45AM', 44: '11:00AM', 45: '11:15AM', 46: '11:30AM', 47: '11:45AM', 48: '12:00PM', 49: '12:15PM', 50: '12:30PM', 51: '12:45PM', 52: '01:00PM', 53: '01:15PM', 54: '01:30PM', 55: '01:45PM', 56: '02:00PM', 57: '02:15PM', 58: '02:30PM', 59: '02:45PM', 60: '03:00PM', 61: '03:15PM', 62: '03:30PM', 63: '03:45PM', 64: '04:00PM', 65: '04:15PM', 66: '04:30PM', 67: '04:45PM', 68: '05:30PM', 69: '05:45PM', 70: '06:00PM', 71: '06:15PM', 72: '06:30PM', 73: '06:45PM', 74: '07:00PM', 75: '07:15PM', 76: '07:30PM', 77: '07:45PM', 78: '08:00PM', 79: '08:15PM', 80: '08:30PM', 81: '08:45PM', 82: '09:00PM', 83: '09:15PM', 84: '09:30PM', 85: '09:45PM', 86: '10:00PM', 87: '10:15PM', 88: '10:30PM', 89: '10:45PM', 90: '11:00PM', 91: '11:15PM', 92: '11:30PM', 93: '11:45PM'
};
```