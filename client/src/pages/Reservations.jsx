import {useQuery} from '@apollo/client'
import { GET_RESERVATIONS } from '../../utils/queries';
import { useState, useEffect } from 'react';
import TimeSlotIndex from "../assets/TimeSlotIndex";
import "../../src/index.css";
import Services from '../assets/Services';

const Reservations = () => {

    const [loadRoster, setRoster] = useState([]);
    const [param, setParam] = useState();
    const { loading: wait, error, data: reservationRoster} = useQuery(GET_RESERVATIONS);

    useEffect(() => {
        reservationSchedule();
    }, [wait])

    // useEffect(() => {
    //     loadRoster ? console.log(loadRoster, "roster") : null;
    // }, [loadRoster])

    useEffect(() => {
        //Redirect to the clicked reservation's page
        param == null ? null : window.location.replace(`/reservations/${param}`);
    }, [param])

    const reservationSchedule = () => {   
        const reservations = reservationRoster?.reservations || [];
        var sortedList;
        if(reservationRoster?.reservations) {
            sortedList = [...reservations];
            sortedList = sortedList.sort((a, b) => {
                return (Number(a.day) - Number(b.day));
            });
            // console.log(sortedList, "Sorted List");
            
            setRoster(sortedList);
        } else {
        setRoster(reservations);}
    };

    const recordId = (e) => {
        //Grabs the <div>'s reservationid and records it to React State Variable
        setParam(e.target.parentElement.getAttribute("reservationid") || e.target.getAttribute("reservationid"));
    }

    const findDuration = (services) => {
        const name = services[0].type;
        const cost = services[0].price;
        const serviceData = Services.filter((item) => item.Item == name);
        const prices = serviceData[0]?.Prices;
        const ratio = prices ? prices.filter((rate) => rate?.cost == cost) : null;
        if(ratio) {
            return ratio[0].time;
        } else {
            return "N/A"
        }
        
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
                    <p className='cardText'>{TimeSlotIndex[reservation?.appointmentTime[0]] || "none"} (Appointment Time: {findDuration(reservation?.services)} Minutes)</p>
                    <div className='flexRow'>
                        <section>
                            <p className='sectionLabel bold'>Client's Name</p>
                            <p className='reservationData'>{reservation?.name || "No name"}</p>
                        </section>
                        <section>
                            <p className='sectionLabel bold'>Email:</p>
                            <p className='reservationData bold'>{reservation?.email || "none"}</p>
                        </section>
                        <section>
                            <p className='sectionLabel'>Phone Number:</p>
                            <p className='reservationData'>{reservation?.phone || "none"}</p>
                        </section>
                        
                    </div>
                    <p className='sectionLabel cardText'>Service(s):</p>

                    {reservation.services.map((service) => {
                        return (
                        <div key={service.client} className='serviceItemCard'>
                            <p className='cardText bold'>{service.type}</p>
                            <p className='cardText'>For: {service.client}</p>
                            <p className='cardText'>Price: ${service.price}</p>
                            <p className='cardText'>AddOns:</p>
                            {service.addOns.length < 1 ? <p className='cardText'>None</p> : null}
                            {service?.addOns.map((extraItem) => {
                                return(<div>
                                    <p className='cardText'>Addition: {extraItem.addition}</p>
                                    <p className='cardText'>Added Price: ${extraItem.price}</p>
                                </div>)
                            })}
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





