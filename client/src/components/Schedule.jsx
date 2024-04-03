import {useQuery} from '@apollo/client'
import { GET_SCHEDULE } from '../../utils/queries';
import { useState, useEffect } from 'react';
import "../../src/index.css";

const Schedule = (props) => {

    const [loadTimeSlot, setTimeSlot] = useState();
    const { loading: wait, error, data: schedule} = useQuery(GET_SCHEDULE, {variables: {year: Number(props.year), month: props.month, day: Number(props.day)}});

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    useEffect(() => {
        console.log(props.year, props.month, props.day, "props");
        console.log(schedule, "schedule");
        console.log(error, "error");
    }, [wait])

    return(
        <div className='schedule'>
            {wait ? <h2>Loading...</h2> : null}
            {/* <select title="time" name="type" value={loadTimeSlot} onChange={(e) => {setTimeSlot(e.target.value)}}>
                <option value="" disabled>-Select-</option>
                {calendar?.calendar ? calendar.calendar.map((year) => {
                    return <option value={year.year}>{year.year}</option>
                }) : null}
            </select> */}
        </div>
    );
};
  
  export default Schedule;