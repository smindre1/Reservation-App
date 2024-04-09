import {useQuery} from '@apollo/client'
import { GET_EMPLOYEES } from '../../utils/queries';
import { useState, useEffect } from 'react';
import "../../src/index.css";

const Employees = () => {

    const [loadRoster, setRoster] = useState([]);
    const { loading: wait, error, data: employeeRoster} = useQuery(GET_EMPLOYEES);

    const employeeList = () => {   
        const employees = employeeRoster?.users || [];
        console.log(employeeRoster?.users, "roster");
        setRoster(employees);
    };

    useEffect(() => {
        employeeList();
    }, [wait])
    

    return(
        <div className='center'>
            <h1 className='alignText'>Employee Roster:</h1>
            {wait ? <h2>Loading...</h2> : null}
            {loadRoster.length
            ? <h2 className='alignText'>Viewing {loadRoster.length} {loadRoster.length === 1 ? 'Employee' : 'Employees'}</h2>
            : <h2 className='alignText'>There are no Employees!</h2>}
            {loadRoster.map((user) => {
                return (
                <div key={user._id}>
                    <h3 className='alignText'>Name: {user?.fullName || "No Available Name"}</h3>
                    <h3 className='alignText'>Email: {user?.email || "No Available Email"}</h3>
                    <p className='alignText'>Phone: {user?.phone || "No Available Phone Number"}</p>
                    <p className='alignText'>{user?.position || "Unknown"}</p>
                </div>
                );
            })}

        </div>
    );
};
  
  export default Employees;





