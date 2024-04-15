import {useQuery} from '@apollo/client'
import { GET_SCHEDULE } from '../../utils/queries';
import { useState, useEffect, forwardRef } from 'react';
import "../../src/index.css";

const Schedule = forwardRef((props, scheduleId) => {

    const [loadTimeSlot, setTimeSlot] = useState([]);
    const { loading: wait, error, data: schedule} = useQuery(GET_SCHEDULE, {variables: {year: Number(props.year), month: props.month, day: Number(props.day), itemCategory: Number(props.itemCategory)}});
    
    const timeslotIndex = { 0: '12:00AM', 1: '12:15AM', 2: '12:30AM', 3: '12:45AM', 4: '01:00AM', 5: '01:15AM', 6: '01:30AM', 7: '01:45AM', 8: '02:00AM', 9: '02:15AM', 10: '02:30AM', 11: '02:45AM', 12: '03:00AM', 13: '03:15AM', 14: '03:30AM', 15: '03:45AM', 16: '04:00AM', 17: '04:15AM', 18: '04:30AM', 19: '04:45AM', 20: '05:00AM', 21: '05:15AM', 22: '05:30AM', 23: '05:45AM', 24: '06:00AM', 25: '06:15AM', 26: '06:30AM', 27: '06:45AM', 28: '07:00AM', 29: '07:15AM', 30: '07:30AM', 31: '07:45AM', 32: '08:00AM', 33: '08:15AM', 34: '08:30AM', 35: '08:45AM', 36: '09:00AM', 37: '09:15AM', 38: '09:30AM', 39: '09:45AM', 40: '10:00AM', 41: '10:15AM', 42: '10:30AM', 43: '10:45AM', 44: '11:00AM', 45: '11:15AM', 46: '11:30AM', 47: '11:45AM', 48: '12:00PM', 49: '12:15PM', 50: '12:30PM', 51: '12:45PM', 52: '01:00PM', 53: '01:15PM', 54: '01:30PM', 55: '01:45PM', 56: '02:00PM', 57: '02:15PM', 58: '02:30PM', 59: '02:45PM', 60: '03:00PM', 61: '03:15PM', 62: '03:30PM', 63: '03:45PM', 64: '04:00PM', 65: '04:15PM', 66: '04:30PM', 67: '04:45PM', 68: '05:00PM', 69: '05:15PM', 70: '05:30PM', 71: '05:45PM', 72: '06:00PM', 73: '06:15PM', 74: '06:30PM', 75: '06:45PM', 76: '07:00PM', 77: '07:15PM', 78: '07:30PM', 79: '07:45PM', 80: '08:00PM', 81: '08:15PM', 82: '08:30PM', 83: '08:45PM', 84: '09:00PM', 85: '09:15PM', 86: '09:30PM', 87: '09:45PM', 88: '10:00PM', 89: '10:15PM', 90: '10:30PM', 91: '10:45PM', 92: '11:00PM', 93: '11:15PM', 94: '11:30PM', 95: '11:45PM'
};

    useEffect(() => {
        props.setTrigger(true);
    }, [loadTimeSlot])

    useEffect(() => {
        !wait ? console.log(schedule?.scchedule, "Schedule ...") : null;
    }, [wait])

    return(
        <div ref={scheduleId} timeslots={loadTimeSlot} className='schedule'>
            {wait ? <h2>Loading...</h2> : null}
            <p>Please select an appointment time.</p>
            {/* {loadTimeSlot.length > 0 ? <p>Selected: {timeslotIndex[Math.min(...loadTimeSlot)]} to {timeslotIndex[Math.max(...loadTimeSlot)]} (EST)</p> : <p>No Time Has Been Selected</p>}
            <div ref={scheduleId} value={loadTimeSlot} className='listedTimeSlots'>
                {schedule?.schedule ? schedule.schedule.map((timeslot) => {
                    return <p className={loadTimeSlot == timeslot.time ? "timeslot selectedTime" : "timeslot"} onClick={(e) => {setTimeSlot([e.target.getAttribute("value")])}} value={timeslot.time} key={timeslot.time}>{timeslotIndex[timeslot.time]}</p>
                }): <h2>Loading...</h2>}
            </div> */}
        </div>
    );
});
  
  export default Schedule;