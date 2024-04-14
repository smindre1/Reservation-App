import { useQuery, useMutation } from '@apollo/client'
import { GET_EMPLOYEES } from '../../utils/queries';
import { UPDATE_EMPLOYEE } from '../../utils/mutations';
import { useState, useEffect } from 'react';
import Auth from "../../utils/auth";
import "../../src/index.css";

const Employees = () => {

    const [loadRoster, setRoster] = useState([]);
    const [currentStaffPosition, setCurrentStaffPosition] = useState({});
    const { loading: wait, error, data: employeeRoster} = useQuery(GET_EMPLOYEES);
    const [updateStaff, { error: staffUpdateError, data: staffDataResponse }] = useMutation(UPDATE_EMPLOYEE);

    const employeeList = () => {   
        const employees = employeeRoster?.users || [];
        setRoster(employees);
    };

    useEffect(() => {
        employeeList();
    }, [wait])

    useEffect(() => {
        console.log(currentStaffPosition, "position")
    }, [currentStaffPosition])

    const userCheck = () => {
        let user = Auth.getProfile();
        let position = user.data ? user.data.position : "Invalid";
        return position;
    }

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

    const loadPositions = (currentPosition) => {
        let user = Auth.getProfile();
        let position = user.data ? user.data.position : "Invalid";

        if(position === "Admin" || position === "Boss") {
            let availablePositions = ["Boss", "Manager", "Employee", "Invalid"];
            availablePositions = availablePositions.filter((role) => role != currentPosition);
            return(availablePositions.map((role) => {
                return(<option key={user._id} className={positionColor(role)}>{role}</option>)}))
        } else if(position === "Manager") {
            let availablePositions = ["Employee", "Invalid"];
            availablePositions = availablePositions.filter((role) => role != currentPosition);
            return(availablePositions.map((role) => {
                return(<option key={user._id} className={positionColor(role)}>{role}</option>)}))
        } else {
            return(loadRoster.map((user) => {
                    return (<p key={user._id} className={positionColor(user?.position)}>{user?.position || "No Available Name"}</p>);
                    }))
        }
    }

    const loadPositionContainer = () => {
        //Checks the position of the person logged in to know what they are allowed to do
        let user = Auth.getProfile();
        let position = user.data ? user.data.position : "Invalid";

        if(position === "Admin" || position === "Boss" || position === "Manager") {
            //Maps through every staff member, as long as they are not of a higher position, allows the user to change their position with the html <select> element
            return(loadRoster.map((staff) => {
                if(position === "Admin" && staff.position != "Admin") {
                    return (
                    <select className="employeeDataInput" key={staff._id} title="change position" name="type" value={currentStaffPosition[staff._id]} onChange={(e) => {setCurrentStaffPosition(currentStaffPosition => {
                        const newPosition = { ...currentStaffPosition, [staff._id]: e.target.value }; return newPosition;})}}>
                        {/* The preloaded <option> element is the staff members current position */}
                        <option key={staff._id} className={positionColor(staff?.position)}>{staff?.position || "Invalid"}</option>
                        {/* The loadPositions() function will render in the remaining <option> elements allowed by the user's current position */}
                        {loadPositions(staff?.position)}
                    </select>)
                } else if(position === "Boss" && staff.position != "Admin") {
                    return(<select key={staff._id} title="change position" name="type" value={currentStaffPosition[staff._id]} onChange={(e) => {setCurrentStaffPosition(currentStaffPosition => {
                        const newPosition = { ...currentStaffPosition, [staff._id]: e.target.value }; return newPosition;})}}>
                        <option key={staff._id} className={positionColor(staff?.position)}>{staff?.position || "Invalid"}</option>
                        {loadPositions(staff?.position)}
                    </select>)
                } else if(position === "Manager" && staff.position != "Admin" && staff.position != "Boss" && staff.position != "Manager") {
                    return (<select key={staff._id} title="change position" name="type" value={currentStaffPosition[staff._id]} onChange={(e) => {setCurrentStaffPosition(currentStaffPosition => {
                        const newPosition = { ...currentStaffPosition, [staff._id]: e.target.value }; return newPosition;})}}>
                        <option key={staff._id} className={positionColor(staff?.position)}>{staff?.position || "Invalid"}</option>
                        {loadPositions(staff?.position)}
                    </select>)
                } else {
                    // It will not allow the option to edit staff of the same position as the user
                    return (<p key={staff._id} className={positionColor(staff?.position)}>{staff?.position || "Invalid"}</p>)
                }
            }))
        } else {
            return(loadRoster.map((user) => {
                // If the user has the position of 'Employee' or 'Invalid' then they are not allowed to edit other staff's positions
                return (<p key={user._id} className={positionColor(user?.position)}>{user?.position || "Invalid"}</p>);
                }))
        }
    }

    const saveChanges = async () => {
        let userIds = Object.keys(currentStaffPosition);
        for(let i=0; i < userIds.length; i++) {
            try {
                const { data } = await updateStaff({
                  variables: { userId: userIds[i], position: currentStaffPosition[userIds[i]] }
                });
              } catch (err) {
                console.error(err);
              }
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
                    return (<p key={user._id} className='employeeData'>{user?.email || "No Available Email"}</p>);
                    })}
                </div>
                <div>
                    <p className='columnLabel'>Phone Number:</p>
                    {loadRoster.map((user) => {
                    return (<p key={user._id} className='employeeData'>{user?.phone || "No Available Number"}</p>);
                    })}
                </div>
                <div className='flexColumn'>
                    <p className='columnLabel'>Position:</p>
                    {loadRoster.length > 0 ? loadPositionContainer() : null}
                </div>
                
            </section>
            {userCheck() == "Admin" || userCheck() == "Boss" || userCheck() == "Manager" ? <button className="formBtn" type="submit" onClick={saveChanges}>Save Changes</button> : null}
        </div>
    );
};
  
  export default Employees;





