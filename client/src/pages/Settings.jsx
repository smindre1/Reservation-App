import { useState, useEffect, useRef} from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import Calendar from "../components/Calendar";
import { UPDATE_DAY_STATUS } from "../../utils/mutations";


const Settings = () => {

  const [UpdatingCalendar, setUpdatingCalendar] = useState(false);
  const [UpdatingHours, setUpdatingHours] = useState(false);
  const [OperationChange, setOperationChange] = useState("");
  const [listOfDays, setListOfDays] = useState([]);

  const calendarId = useRef(null);
  const [updateDay, { error, data }] = useMutation(UPDATE_DAY_STATUS);

  // useEffect(() => {
  //   console.log(listOfDays, "list");
  // }, [listOfDays])

  const updateSpecificDays = async () => {
    if(!UpdatingCalendar) {
        return;
      } else {
  
        try {
          if(OperationChange == "Open" || OperationChange == "Closed") {
            let openStatus = OperationChange == "Open" ? true : false;
            // let promises = [];
            // listOfDays.map((date) => {
            //   const promise = new Promise((resolve, reject) => {
            //     setTimeout(async () => {
            //       resolve(await updateDay({
            //   variables: { year: Number(date.year) , month: date.month, day: Number(date.day), open: openStatus}
            //   }));
            //     }, 500);
            //   });
            //   promises.push(promise);
            // });
            // console.log(promises);
            // if (promises != []) {
            // const results = await Promise.allSettled(promises)}
        

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

  const addDayToList = () => {
    if(calendarId.current.getAttribute("year") == null || calendarId.current.getAttribute("month") == null || calendarId.current.getAttribute("day") == null) {
      return;
    } else {
      let year = calendarId.current.getAttribute("year");
      let month = calendarId.current.getAttribute("month");
      let day = calendarId.current.getAttribute("day");
      let list = [...listOfDays];
      list.push({year, month, day})
      setListOfDays(list);
    }
  }
              // 
  return (
    <section>
        <h1>Settings:</h1>
        <div>
          <h2>Adjust Operating Hours:</h2>
        </div>
        <div>
          <h2>Adjust Days Of the Week:</h2>
        </div>
        <div>
          <h2>Open/Close For Specific Days of the Year (Holidays, Birthdays, etc...):</h2>
          <button onClick={() => {setUpdatingHours(false); setUpdatingCalendar(true)}}>Update Specific Operating Days</button>
          {UpdatingCalendar ? 
          <div>
            <p>Explore the Calendar and click the select button to add a date to the list:</p>
            <Calendar ref={calendarId} year="" month="" day="" timeslots="" schedule="false"/>
            
            <button onClick={addDayToList}>Select</button>
            <p>Selected Dates:</p>
            <ul>
              {listOfDays == [] ? <p>No dates selected</p> :  
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
        <div>
          <h2>Adjust Operating Hours For Specific Days (Example: Half Days):</h2>
          <button onClick={() => {setUpdatingCalendar(false); setUpdatingHours(true)}}>Update Specific Operating Days</button>
          {UpdatingHours ? 
          <div>
            <Calendar ref={calendarId} year="" month="" day="" timeslots="" schedule="false"/>
          </div>
             : null}
        </div>
        
    </section>
  );
  };
    
    export default Settings;