import { useState, useEffect, useRef} from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import Calendar from "../components/Calendar";
import { UPDATE_DAY_STATUS, UPDATE_SCHEDULE_DAY, UPDATE_CALENDAR_WEEKDAYS } from "../../utils/mutations";
import { GET_CALENDAR_MONTH } from '../../utils/queries';
import TimeSlotIndex from "../assets/TimeSlotIndex.js";

//This settings page conducts four operations for the user to customize there business/reservation schedule.
//Operation One:
// Allows the user to adjust which days of the week they are open or closed for (Ex: Sun, Mon, Tue...).

//Operation Two:
// Allows the user to adjust their average/usual operating business hours.

//Operation Three:
// Allows the user to adjust specific calendar days to open/closed status.

//Operation Four:
// Allows the user to adjust specific schedule days to different custom operating hours.

const Settings = () => {

  //Operation One:
  const [UpdatingWeekdayCalendar, setUpdatingWeekdayCalendar] = useState(false);
  const [weekdays, setWeekdays] = useState({Sun: "", Mon: "", Tue: "", Wed: "", Thu: "", Fri: "", Sat: ""});

  //Operation Three:
  const [UpdatingCalendar, setUpdatingCalendar] = useState(false);
  const [OperationChange, setOperationChange] = useState("");
  const [listOfDays, setListOfDays] = useState([]);
  //Operation Four:
  const [UpdatingSpecificHours, setUpdatingSpecificHours] = useState(false);
  const [secondListOfDays, setSecondListOfDays] = useState([]);
  const [openingTime, setOpeningTime] = useState();
  const [closingTime, setClosingTime] = useState();

  //Operation Three:
  const calendarOneId = useRef(null);
  //Operation Four:
  const calendarTwoId = useRef(null);
  const [updateDay, { error, data }] = useMutation(UPDATE_DAY_STATUS);
  const [updateScheduleDay, { error: ScheduleError, data: ScheduleDay }] = useMutation(UPDATE_SCHEDULE_DAY);
  //The variables for the calendar month are for the test year that acts as a control group
  //It's only purpose is to reliably measure overall pattern changes applied to the calendar
  //Operation One:
  const { loading: wait, calendarError, data: calendarMonth} = useQuery(GET_CALENDAR_MONTH, {variables: {year: 1000, month: "January"}});
  const [updateCalendarWeekdays, { error: CalendarWeekError, data: CalendarWeek }] = useMutation(UPDATE_CALENDAR_WEEKDAYS);

  
  useEffect(() => {
    let weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (!wait) {
      let data = calendarMonth.getCalendarMonth;
      for(let i=0; i < 7; i++) {
        let updatedWeek = Object.assign(weekdays, {[weekdayIndex[i]]: `${data[i].open}`})
        setWeekdays(updatedWeek);
      }
    }
}, [wait])

  //Operation One:
  const updateWeekdays = async () => {
    await updateCalendarWeekdays({
      variables: { Sun: JSON.parse(weekdays.Sun), Mon: JSON.parse(weekdays.Mon), Tue: JSON.parse(weekdays.Tue), Wed: JSON.parse(weekdays.Wed), Thu: JSON.parse(weekdays.Thu), Fri: JSON.parse(weekdays.Fri), Sat: JSON.parse(weekdays.Sat) }
    });
  }

  const userChangingWeekday = (num, value) => {
    let weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    console.log(value, "value");
    // let updatedWeek = Object.assign(weekdays, {[weekdayIndex[num]]: value})
    // setWeekdays(updatedWeek);

    setWeekdays(weekdays => {
      const updatedWeek = { ...weekdays, [weekdayIndex[num]]: value };
      return updatedWeek;
    });
  }

  const updateSpecificDays = async () => {
    if(!UpdatingCalendar) {
        return;
      } else {
  
        try {
          if(OperationChange == "Open" || OperationChange == "Closed") {
            let openStatus = OperationChange == "Open" ? true : false;
            for(let i=0; i < listOfDays.length; i++) {
              await updateDay({
                  variables: { year: Number(listOfDays[i].year) , month: listOfDays[i].month, day: Number(listOfDays[i].day), open: openStatus}
                  });
            }
          }
        } catch (err) {
          console.error(err);
        }
  }}

  const updateSpecificScheduleDays = async () => {
    if(!UpdatingSpecificHours) {
        return;
      } else {
        try {
          //Time is measured as integers from 0 to 93 so we are checking to make sure the user put the opening and closing times in the correct order
          if(Number(openingTime) < Number(closingTime)) {
            for(let i=0; i < secondListOfDays.length; i++) {
              await updateScheduleDay({
                  variables: { year: Number(secondListOfDays[i].year) , month: secondListOfDays[i].month, day: Number(secondListOfDays[i].day), openingTime: Number(openingTime), closingTime: Number(closingTime)}
                  });
            }
          } else {
            //This is in the event the user has openingTime > closingTime, which translates to them accidetally inputing the oposite times
            for(let i=0; i < secondListOfDays.length; i++) {
              await updateScheduleDay({
                  variables: { year: Number(secondListOfDays[i].year) , month: secondListOfDays[i].month, day: Number(secondListOfDays[i].day), openingTime: Number(closingTime), closingTime: Number(openingTime)}
                  });
            }
          }
        } catch (err) {
          console.error(err);
        }
  }}

  const addDayToList = () => {
    if(calendarOneId.current.getAttribute("year") == null || calendarOneId.current.getAttribute("month") == null || calendarOneId.current.getAttribute("day") == null) {
      return;
    } else {
      let year = calendarOneId.current.getAttribute("year");
      let month = calendarOneId.current.getAttribute("month");
      let day = calendarOneId.current.getAttribute("day");
      let list = [...listOfDays];
      list.push({year, month, day})
      setListOfDays(list);
    }
  }

  //Because React Ref cannot be treated as a parameter, a duplicate function was needed for Operation Four
  const addDayToSecondList = () => {
    if(calendarTwoId.current.getAttribute("year") == null || calendarTwoId.current.getAttribute("month") == null || calendarTwoId.current.getAttribute("day") == null) {
      return;
    } else {
      let year = calendarTwoId.current.getAttribute("year");
      let month = calendarTwoId.current.getAttribute("month");
      let day = calendarTwoId.current.getAttribute("day");
      let list = [...secondListOfDays];
      list.push({year, month, day})
      setSecondListOfDays(list);
    }
  }

  const timeSlotOptions = () => {
    let list = Object.entries(TimeSlotIndex);
    return (list.map((timeSlot) => {
      return (<option value={timeSlot[0]} key={timeSlot[0]}>{timeSlot[1]}</option>)
    }))
  }

  return (
    <section>
        <h1>Settings:</h1>
        {/* Operation One: */}
        <div>
          <h2>Adjust Days Of the Week:</h2>
          {!UpdatingWeekdayCalendar ? <button onClick={() => {setUpdatingWeekdayCalendar(true); setUpdatingSpecificHours(false); setUpdatingCalendar(false);}}>Change Which Weekdays You're Open For</button> : null}
          {UpdatingWeekdayCalendar ? 
          <section>
            <div className="flexRow weekdayDiv">
              <p className="weekday">Sunday:</p>
              <select className="weekdayInput" title="status" name="type" value={weekdays.Sun} onChange={(e) => {userChangingWeekday(0, e.target.value)}}>
                <option value="" disabled>-Select-</option>
                <option value="true">Open</option>
                <option value="false">Closed</option>
              </select>
            </div>
            <div className="flexRow weekdayDiv">
              <p className="weekday">Monday:</p>
              <select title="status" name="type" value={weekdays.Mon} onChange={(e) => {userChangingWeekday(1, e.target.value)}}>
                <option value="" disabled>-Select-</option>
                <option value="true">Open</option>
                <option value="false">Closed</option>
              </select>
            </div>
            <div className="flexRow weekdayDiv">
              <p className="weekday">Tuesday:</p>
              <select title="status" name="type" value={weekdays.Tue} onChange={(e) => {userChangingWeekday(2, e.target.value)}}>
                <option value="" disabled>-Select-</option>
                <option value="true">Open</option>
                <option value="false">Closed</option>
              </select>
            </div>
            <div className="flexRow weekdayDiv">
              <p className="weekday">Wednesday:</p>
              <select title="status" name="type" value={weekdays.Wed} onChange={(e) => {userChangingWeekday(3, e.target.value)}}>
                <option value="" disabled>-Select-</option>
                <option value="true">Open</option>
                <option value="false">Closed</option>
              </select>
            </div>
            <div className="flexRow weekdayDiv">
              <p className="weekday">Thursday:</p>
              <select title="status" name="type" value={weekdays.Thu} onChange={(e) => {userChangingWeekday(4, e.target.value)}}>
                <option value="" disabled>-Select-</option>
                <option value="true">Open</option>
                <option value="false">Closed</option>
              </select>
            </div>
            <div className="flexRow weekdayDiv">
              <p className="weekday">Friday:</p>
              <select title="status" name="type" value={weekdays.Fri} onChange={(e) => {userChangingWeekday(5, e.target.value)}}>
                <option value="" disabled>-Select-</option>
                <option value="true">Open</option>
                <option value="false">Closed</option>
              </select>
            </div>
            <div className="flexRow weekdayDiv">
              <p className="weekday">Saturday:</p>
              <select title="status" name="type" value={weekdays.Sat} onChange={(e) => {userChangingWeekday(6, e.target.value)}}>
                <option value="" disabled>-Select-</option>
                <option value="true">Open</option>
                <option value="false">Closed</option>
              </select>
            </div>
            <button onClick={() => {updateWeekdays()}}>Save</button>
          </section>
          : null}
        </div>
        
        {/* Operation Two: */}
        <div>
          <h2>Adjust Operating Hours:</h2>
        </div>
        {/* Operation Three: */}
        <div>
          <h2>Open/Close For Specific Days of the Year (Holidays, Birthdays, etc...):</h2>
          {!UpdatingCalendar ? <button onClick={() => {setUpdatingWeekdayCalendar(false); setUpdatingSpecificHours(false); setUpdatingCalendar(true)}}>Update Specific Operating Days</button> : null}
          {UpdatingCalendar ? 
          <div>
            <p>Explore the Calendar and click the select button to add a date to the list:</p>
            <Calendar ref={calendarOneId} year="" month="" day="" timeslots="" schedule="false"/>
            
            <button onClick={addDayToList}>Select</button>
            <p>Selected Dates:</p>
            <ul>
              {listOfDays.length < 1 ? <p>No dates selected</p> :  
              listOfDays.map((date) => { 
                return (
                <li>{date.month} {date.day}, {date.year}</li>)
              })}
            </ul>
            <p>Please click whether you want your store/business to be OPEN or CLOSED for your listed dates:</p>
            <select title="status" name="type" value={OperationChange} onChange={(e) => {setOperationChange(e.target.value)}}>
              <option value="" disabled>-Select-</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
            <button onClick={() => {updateSpecificDays().then(setListOfDays([]))}}>Save</button>
          </div>
            : null}
        </div>
        {/* Operation Four: */}
        <div>
          <h2>Adjust Operating Hours For Specific Days (Example: Half Days):</h2>
          {!UpdatingSpecificHours ? <button onClick={() => {setUpdatingWeekdayCalendar(false); setUpdatingCalendar(false); setUpdatingSpecificHours(true)}}>Update Specific Operating Days</button> : null}
          {UpdatingSpecificHours ? 
          <div>
            <Calendar ref={calendarTwoId} year="" month="" day="" timeslots="" schedule="false"/>
            <button onClick={addDayToSecondList}>Select</button>
            <p>Selected Dates:</p>
            <ul>
              {secondListOfDays.length < 1 ? <p>No dates selected</p> :  
              secondListOfDays.map((date) => { 
                return (
                <li>{date.month} {date.day}, {date.year}</li>)
              })}
            </ul>
            <div className="flexRow">
              <select className="timeInput" title="openingTime" name="type" value={openingTime} onChange={(e) => {setOpeningTime(e.target.value)}}>
                <option value="" disabled>-Select-</option>
                {timeSlotOptions()}
              </select>
              <p className="text"> To </p>
              <select className="timeInput" title="closingTime" name="type" value={closingTime} onChange={(e) => {setClosingTime(e.target.value)}}>
                <option value="" disabled>-Select-</option>
                {timeSlotOptions()}
              </select>   
            </div>
            <button onClick={() => {updateSpecificScheduleDays().then(setSecondListOfDays([]))}}>Save</button>
          </div>
             : null}
        </div>
        
    </section>
  );
  };
    
    export default Settings;