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

    const positionColor = (position) => {
        if(position === "Admin") {
            return 'admin employeeData'
        } else if(position === "Boss") {
            return 'boss employeeData'
        } else if(position === "Manager") {
            return 'manager employeeData'
        } else if(position === 'Employee') {
            return 'employee employeeData'
        } else {
            return 'employeeData'
        }
    }
    

    return(
        <div className='center'>
            <h1 className='alignText'>Employee Roster:</h1>
            {wait ? <h2>Loading...</h2> : null}
            {loadRoster.length
            ? <h2 className='alignText'>Viewing {loadRoster.length} {loadRoster.length === 1 ? 'Employee' : 'Employees'}</h2>
            : <h2 className='alignText'>There are no Employees!</h2>}
            <section className='flexRow employeeRoster'>
                <div>
                    <p className='columnLabel'>Name:</p>
                    {loadRoster.map((user) => {
                    return (<p key={user._id} className='employeeData'>{user?.fullName || "No Available Name"}</p>);
                    })}
                </div>
                <div>
                    <p className='columnLabel'>Email:</p>
                    {loadRoster.map((user) => {
                    return (<p key={user._id} className='employeeData'>{user?.email || "No Available Name"}</p>);
                    })}
                </div>
                <div>
                    <p className='columnLabel'>Phone Number:</p>
                    {loadRoster.map((user) => {
                    return (<p key={user._id} className='employeeData'>{user?.phone || "No Available Name"}</p>);
                    })}
                </div>
                <div>
                    <p className='columnLabel'>Position:</p>
                    {loadRoster.map((user) => {
                    return (<p key={user._id} className={positionColor(user?.position)}>{user?.position || "No Available Name"}</p>);
                    })}
                </div>
               
            </section>
            {/* {loadRoster.map((user) => {
                return (
                <div key={user._id}>
                    <h3 className='alignText'>Name: {user?.fullName || "No Available Name"}</h3>
                    <h3 className='alignText'>Email: {user?.email || "No Available Email"}</h3>
                    <p className='alignText'>Phone: {user?.phone || "No Available Phone Number"}</p>
                    <p className='alignText'>{user?.position || "Unknown"}</p>
                </div>
                );
            })} */}

        </div>
    );
};
  
  export default Employees;





