import {useQuery} from '@apollo/client'
import { GET_RESERVATIONS } from '../../utils/queries';
import { useState, useEffect } from 'react';
import "../../src/index.css";

const Reservations = () => {

    const [loadRoster, setRoster] = useState([]);
    const [param, setParam] = useState();
    const { loading: wait, error, data: reservationRoster} = useQuery(GET_RESERVATIONS);

    useEffect(() => {
        reservationSchedule();
    }, [wait])

    useEffect(() => {
        //Redirect to the clicked reservation's page
        param == null ? null : window.location.replace(`/reservations/${param}`);
    }, [param])

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
            console.log(reservations, "ummm");
        } else {
        setRoster(reservations);}
    };

    const recordId = (e) => {
        //Grabs the <div>'s reservationid and records it to React State Variable
        setParam(e.target.parentElement.getAttribute("reservationid") || e.target.getAttribute("reservationid"));
    }

    return(
        <div className='center'>
            {wait ? <h2>Loading...</h2> : null}
            {loadRoster.length
            ? <p className='alignText'>Viewing {loadRoster.length} {loadRoster.length === 1 ? 'Reservation' : 'Reservations'}:</p>
            : <p className='alignText'>There are no Reservations Currently</p>}
            {loadRoster.map((reservation) => {
                return (
                <div className='clientReservationCard' key={reservation._id} reservationid={reservation._id} onClick={recordId}>
                    <p className='cardText'>{reservation?.appointmentTime || "none"} (Appointment Time)</p>
                    <p className='cardText bold'>Client's Name: {reservation?.name || "No name"}</p>
                    <p className='cardText bold'>Email: {reservation?.email || "none"}</p>
                    <p className='cardText'>Phone Number: {reservation?.phone || "none"}</p>
                    <p className='cardText'>Service(s):</p>

                    {reservation.services.map((service) => {
                        return (
                        <div className='serviceItemCard'>
                            <p className='cardText'>{service.type}</p>
                            <p className='cardText'>For: {service.client}</p>
                            <p className='cardText'>${service.price}</p>
                        </div>
                        )
                    })}
                        
                    {reservation.specialRequests ? <p className='cardText'>Special Requests: <br></br>{reservation.specialRequests}</p> : null}
                    <p className='cardText'>Date: {reservation?.day || "none"}</p>
                </div>
                );
            })}

        </div>
    );
};
  
  export default Reservations;





