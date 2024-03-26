// import { Link } from 'react-router-dom';
import {useQuery} from '@apollo/client'
import { GET_RESERVATIONS } from '../../utils/queries';
import { useState, useEffect } from 'react';
import "../../src/index.css";

const Reservations = () => {

    const [loadRoster, setRoster] = useState([]);
    const { loading: wait, error, data: reservationRoster} = useQuery(GET_RESERVATIONS);

    const reservationSchedule = () => {   
        const reservations = reservationRoster?.reservations || [];
        console.log(reservationRoster?.reservations, "roster");
        var sortedList;
        if(reservationRoster?.reservations) {
            sortedList = [...reservations];
            sortedList = sortedList.sort((a, b) => {
                return (Number(a.day) - Number(b.day));
            });
            console.log(sortedList, "Sorted List");
            setRoster(sortedList);
        } else {
        setRoster(reservations);}
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
            ? <p className='alignText'>Viewing {loadRoster.length} {loadRoster.length === 1 ? 'Reservation' : 'Reservations'}:</p>
            : <p className='alignText'>There are no Reservations Currently</p>}
            {loadRoster.map((reservation) => {
                return (
                <div className='clientReservationCard' key={reservation._id} reservationid={reservation._id} onClick={goToReservation}>
                    <p className='cardText'>{reservation?.appointmentTime || "none"} (Appointment Time)</p>
                    <p className='cardText bold'>Client's Name: {reservation?.name || "No name"}</p>
                    <p className='cardText bold'>Email: {reservation?.email || "none"}</p>
                    <p className='cardText'>Phone Number: {reservation?.phone || "none"}</p>
                    <p className='cardText'>Service(s):</p>
                    {/* {reservation.services.forEach((service) => {
                        return (
                        <div>
                            <p>{service.type}</p>
                            <p>For: {service.client}</p>
                            <p>${service.price}</p>
                        </div>
                        )})} */}
                    
                    <div className='serviceItemCard'>
                        <p className='cardText'>{reservation.services.type}</p>
                        <p className='cardText'>For: {reservation.services.client}</p>
                        <p className='cardText'>${reservation.services.price}</p>
                    </div>
                        
                    {reservation.specialRequests ? <p className='cardText'>Special Requests: <br></br>{reservation.specialRequests}</p> : null}
                    <p className='cardText'>Date: {reservation?.day || "none"}</p>
                </div>
                );
            })}

        </div>
    );
};
  
  export default Reservations;





