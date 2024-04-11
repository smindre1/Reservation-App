import { useState, useEffect, useRef} from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import Calendar from "../components/Calendar";
import { UPDATE_DAY_STATUS, UPDATE_SCHEDULE_DAY } from "../../utils/mutations";
import { GET_CALENDAR_MONTH } from '../../utils/queries';
import TimeSlotIndex from "../assets/TimeSlotIndex.js";


const Settings = () => {

  const [UpdatingCalendar, setUpdatingCalendar] = useState(false);
  const [UpdatingHours, setUpdatingHours] = useState(false);
  const [OperationChange, setOperationChange] = useState("");
  const [listOfDays, setListOfDays] = useState([]);
  const [secondListOfDays, setSecondListOfDays] = useState([]);
  const [openingTime, setOpeningTime] = useState();
  const [closingTime, setClosingTime] = useState();

  const calendarOneId = useRef(null);
  const calendarTwoId = useRef(null);
  const [updateDay, { error, data }] = useMutation(UPDATE_DAY_STATUS);
  const [updateScheduleDay, { error: ScheduleError, data: ScheduleDay }] = useMutation(UPDATE_SCHEDULE_DAY);
  //The variables for the calendar month are for the test year that acts as a control group
  //It's only purpose is to reliably measure overall pattern changes applied to the calendar
  const { loading: wait, calendarError, data: calendarMonth} = useQuery(GET_CALENDAR_MONTH, {variables: {year: 1000, month: "January"}});

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
    if(!UpdatingHours) {
        return;
      } else {
        try {
          //time is measured as integers from 0 to 93 so we are checking to make sure the user put the opening and closing times in the correct order
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

  //Because React Ref cannot be treated as a parameter, a duplicate function was needed
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
        <div>
          <h2>Adjust Operating Hours:</h2>
        </div>
        <div>
          <h2>Adjust Days Of the Week:</h2>

        </div>
        {/* Updating Calendar: */}
        <div>
          <h2>Open/Close For Specific Days of the Year (Holidays, Birthdays, etc...):</h2>
          <button onClick={() => {setUpdatingHours(false); setUpdatingCalendar(true)}}>Update Specific Operating Days</button>
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
        {/* Updating Hours: */}
        <div>
          <h2>Adjust Operating Hours For Specific Days (Example: Half Days):</h2>
          <button onClick={() => {setUpdatingCalendar(false); setUpdatingHours(true)}}>Update Specific Operating Days</button>
          {UpdatingHours ? 
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