import {useQuery} from '@apollo/client'
import { GET_CALENDAR } from '../../utils/queries';
import { useState, useEffect, useRef, forwardRef } from 'react';
import "../../src/index.css";
import Schedule from './Schedule';

const Calendar = forwardRef((props, calendarId) => {

    const [loadYear, setYear] = useState();
    const [loadMonth, setMonth] = useState();
    const [loadDays, setDays] = useState();
    const [loadDay, setDay] = useState();
    const [loadOpenStatus, setOpenStatus] = useState();
    const [updated, setUpdated] = useState(false);
    const [loadTimeSlots, setTimeSlots] = useState();
    const { loading: wait, error, data: calendar} = useQuery(GET_CALENDAR);

    const scheduleId = useRef(null);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    useEffect(() => {
        const today = new Date();
        setYear(today.getFullYear());
        setMonth(months[today.getMonth()]);
    }, [])

    useEffect(() => {
        if(calendar) {
            displayDays(loadYear, loadMonth);
        }
    }, [wait, loadYear, loadMonth])

    useEffect(() => {
        if(updated == true) {
            setTimeSlots(scheduleId.current.getAttribute("timeslots"));
            setUpdated(false);
        }
    }, [updated])

    const displayDays = (year, month) => {
        const specificYear = calendar.calendar.find((calYears) => calYears.year == year);
        setDays(specificYear[month]);
    };

    const checkIfClosed = (days) => {
        if(days.day == loadDay) { return 'selectedDay calendarDay'} 
        else if (days.open == false) { return 'closedCalendarDay calendarDay'}
        else { return 'calendarDay'}
    }

    return(
        <div ref={calendarId} year={loadYear} month={loadMonth} day={loadDay} timeslots={loadTimeSlots} className="dateTool">
            <div className='calendar'>
                {wait ? <h2>Loading...</h2> : null}
                <select title="year" name="type" value={loadYear} onChange={(e) => {setYear(e.target.value)}}>
                    <option value="" disabled>-Select-</option>
                    {calendar?.calendar ? calendar.calendar.map((year) => {
                        return <option value={year.year} key={year.year}>{year.year}</option>
                    }) : null}
                </select>
                <select title="month" name="type" value={loadMonth} onChange={(e) => {setMonth(e.target.value)}}>
                    <option value="" disabled>-Select-</option>
                    {calendar?.calendar ? months.map((month) => {
                        return <option value={month} key={month}>{month}</option>
                    }) : null}
                </select>
                <div className='calendarDays'>
                    {loadDays ?
                        loadDays.map((days) => {
                        return <a className={checkIfClosed(days)} value={days.day} key={days.day} onClick={(e) => {setDay(e.target.getAttribute("value")); setOpenStatus(days.open)}}>{days.day}</a>
                    }) : null}
                </div>
            </div>
            { props.schedule === "true" && loadOpenStatus === true ? <Schedule ref={scheduleId} year={loadYear} month={loadMonth} day={loadDay} setTrigger={setUpdated}/> : <p className='schedule'>No available timeslots for this date.<br></br>(Please select another day)</p>}
        </div>
    );
});
  
  export default Calendar;