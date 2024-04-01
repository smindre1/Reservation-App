import {useQuery} from '@apollo/client'
import { GET_UNRESERVED_SCHEDULE } from '../../utils/queries';
import { useState, useEffect } from 'react';
import "../../src/index.css";

const Schedule = () => {

    const [loadSchedulePage, setSchedulePage] = useState([]);
    const [ready, setReady] = useState(false);
    const { loading: wait, error, data: schedule} = useQuery(GET_UNRESERVED_SCHEDULE);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const today = new Date();

    useEffect(() => {
        console.log(schedule?.schedule, "Schedule");
        // setSchedulePage([today.getFullYear, months[today.getMonth()]]);
        schedule ? schedule.schedule.map((year) => {
            console.log(year.year, "year");
        }) : null;
        schedule ? setReady(true) : null;
        ready ? setSchedulePage([today.getFullYear, months[today.getMonth()]]) : null;
    }, [wait])
    

    return(
        <div className='schedule'>
            {wait ? <h2>Loading...</h2> : null}
            <select name="type" value={loadSchedulePage[0]} onChange={(e) => {const newValue = [ e.target.value, loadSchedulePage[1]]; setSchedulePage(newValue)}}>
                <option value="" disabled>-Select-</option>
                {ready ? schedule.schedule.map((year) => {
                    return <option value={year.year}>{year.year}</option>
                }) : null}
            </select>
            <select name="type" value={loadSchedulePage[1]} onChange={(e) => {const newValue = [ loadSchedulePage[0], e.target.value ]; setSchedulePage(newValue)}}>
                <option value="" disabled>-Select-</option>
                {ready ? months.map((month) => {
                    return <option value={month}>{month}</option>
                }) : null}
            </select>
        </div>
    );
};
  
  export default Schedule;