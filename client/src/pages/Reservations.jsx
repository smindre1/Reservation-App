// import { Link } from 'react-router-dom';
import {useQuery} from '@apollo/client'
import { GET_RESERVATIONS, GET_RESERVATION } from '../../utils/queries';
import { useState, useEffect } from 'react';
import "../../src/index.css";

const Reservations = () => {

    const [loadRoster, setRoster] = useState([]);
    const { loading: wait, error, data: reservationRoster} = useQuery(GET_RESERVATIONS);

    const reservationSchedule = () => {   
        const reservations = reservationRoster?.users || [];
        setRoster(reservations);
    };

    useEffect(() => {
        reservationSchedule();
    }, [wait])

    const goToReservation = (e) => {
        //Depending on what is clicked it will grab the <div>'s reservationid
        const id = e.target.parentElement.getAttribute("reservationid") || e.target.getAttribute("reservationid");
        //Redirect to the clicked reservation's page
        window.location.replace(`/reservations/${id}`);
    }

    return(
        <div className='center'>
            {/* <div className='lostfound'>
                <button className='lostfoundBtns' onClick={() => employeeList()}>Lost</button>
            </div> */}
            {wait ? <h2>Loading...</h2> : null}
            {loadRoster.length
            ? <p className='alignText'>Viewing {loadRoster.length}{loadRoster.length === 1 ? 'Reservation' : 'Reservations'}:</p>
            : <p className='alignText'>There are no Reservations Currently</p>}
            {loadRoster.map((reservation) => {
                return (
                <div className='postLayout' key={reservations._id} reservationid={reservations._id} onClick={goToReservation}>
                    <h1 className='alignText'>Client's Name: {reservation?.name || "No name"}</h1>
                    <h2 className='alignText'>Email: {reservation?.email || "none"}</h2>
                    <p className='alignText'>Phone Number: {reservation?.phone || "none"}</p>
                    <p className='alignText'>Appointment Time: {reservation?.appointmntTime || "none"}</p>
                    <p>Service(s):</p>
                    {reservation?.services.map((service) => {
                        return (
                        <div>
                            <p>{service.type}</p>
                            <p>For: {service.client}</p>
                            <p>${service.price}</p>
                        </div>
                        )})}
                    {reservation.specialRequests ? <p>Special Requests: {reservation.specialRequests}</p> : null}
                    
                </div>
                );
            })}

        </div>
    );
};
  
  export default Reservations;





