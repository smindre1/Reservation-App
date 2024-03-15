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
            {wait ? <h2>Loading...</h2> : null}
            {loadRoster.length
            ? <p className='alignText'>Viewing {loadRoster.length} {loadRoster.length === 1 ? 'Employee' : 'Employees'}</p>
            : <p className='alignText'>There are no Employees!</p>}
            {loadRoster.map((user) => {
                return (
                <div key={user._id}>
                    <h1 className='alignText'>Name: {user?.fullName || "No Available Name"}</h1>
                    <h2 className='alignText'>Email: {user?.email || "No Available Email"}</h2>
                    <p className='alignText'>Phone: {user?.phone || "No Available Phone Number"}</p>
                    <p className='alignText'>{user?.position || "Unknown"}</p>
                </div>
                );
            })}

        </div>
    );
};
  
  export default Employees;





