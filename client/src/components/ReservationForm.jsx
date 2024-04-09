import { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_RESERVATION } from "../../utils/mutations";
import Calendar from "./Calendar";
// import Popup from '../components/Popup';

const ReservationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [services, setServices] = useState([]);
  const [serviceType, setServiceType] = useState("");
  const [serviceClient, setServiceClient] = useState("");
  const [servicePrice, setServicePrice] = useState(0);
  //This is used to make different keys for each service the client is considering purchasing.
  const [serviceKey, setServiceKey] = useState(0);
  const [specialRequests, setSpecialRequests] = useState("");

  //Used for the popup, but I plan to redirect page so it may not be necessary.
  const [success, setSuccess] = useState(false);

  const nameId = useRef(null);
  const emailId = useRef(null);
  const numberId = useRef(null);
  const appointmentTimeId = useRef(null);
  const servicesId = useRef(null);
  const specialRequestsId = useRef(null);
  const divId = useRef(null);
  const calendarId = useRef(null);
  // const scheduleId = useRef(null);

  const [addReservation, { error, data }] = useMutation(ADD_RESERVATION);

  const checkForm = () => {
    //Creates an array of each form field
    const items = [{value: name, id: nameId}, {value: email, id: emailId}, {value: number, id: numberId}];
    //Checks that each field has content, otherwise changes to error state
    items.forEach((item) => {
      if(item.value == "") {
        item.id.current.firstChild.classList.add("error");
        item.id.current.lastChild.classList.remove("hide");
      }
    });
    if(calendarId.current.getAttribute("timeslots") == null || calendarId.current.getAttribute("year") == null) {
      appointmentTimeId.current.firstChild.classList.add("error");
      appointmentTimeId.current.lastChild.classList.remove("hide");
    }
  }

  //Removes a form field's error state when the client adds content
  const handleChange = (event) => {
    //*Future Note: These are dependent on <input> and <p> respectively being the first and last child element's in their field <div>
    event.target.classList.contains("error") ? event.target.classList.remove("error"): null;
    const hidden = event.target.parentElement.lastChild.classList.contains("hide")
    !hidden ? event.target.parentElement.lastChild.classList.add("hide") : null;
  }

  const handlePhone = (value) => {
    if (!value) return;
    // Resets any non-numbers that the client inputs
    const letterRegex = /[\D]/g;
    if (value.match(letterRegex)) {setNumber('')};
    
    // Takes the inputted numbers and formats them into a phone number template
    const regex = /[\d]/g;
    var phoneNumber = value.match(regex);
    if (value.match(regex)) {
    phoneNumber = phoneNumber.join('');
    }
    const numLength = phoneNumber?.length;
    if (numLength < 4) {
      setNumber(phoneNumber)};
    if (3 < numLength && numLength < 7) {
      setNumber(`(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`);
    };
    if (numLength > 6) {
      setNumber(`(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)} - ${phoneNumber.slice(6, 10)}`);
    }
  }
    
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServices(JSON.parse(localStorage.getItem("services")));
    checkForm();
    const intPrice = Number(servicePrice);
    console.log(typeof intPrice, "price Int?");
    setServicePrice(intPrice)
    //This is the date and time(s) taken from the Calendar/Schedule components
    const year = calendarId.current.getAttribute("year");
    const month = calendarId.current.getAttribute("month");
    const day = calendarId.current.getAttribute("day");
    const date = `${month} ${day}, ${year}`;
    let timeslots = calendarId.current.getAttribute("timeslots");
    timeslots = timeslots.replaceAll(',', ', ');
    timeslots = `[${timeslots}]`;
    timeslots = JSON.parse(timeslots);
    //An empty field will prevent the form from submitting
    if(name == "" || email == "" || number == "" || day == "") {

    // if(name == "") {
      setSuccess(false);
      e.stopPropagation();
    } else {
      //The payment is being left as a default N/A for testing
      const reservationFormData = { name: name, email: email, phone: number, day: date, appointmentTime: timeslots, services: [{type: serviceType, client: serviceClient, price: intPrice}], specialRequests: specialRequests, payment: {cardOwner: "Bob", cardNumber: 1000, cardExpiration: 1000, securityCode: 123, billingAddress: "Confusion"} };

      try {
        const { data } = await addReservation({
          variables: { ...reservationFormData }
        });

      } catch (err) {
        console.error(err);
      }
      // Reset form after successful submission
      setName("");
      setEmail("");
      setNumber("");
      setServices([]);
      localStorage.removeItem("services");
      setSpecialRequests("Invalid");
      //State change initiates popup
      setSuccess(true);
    }
  };

  return (
    <form className="signupForm" autoComplete="off" onSubmit={handleSubmit}>
      <h2>Make Your Reservation(s)</h2>
      <div ref={divId} className="formDiv">
        <div ref={nameId} className="flexColumn formSection">
          <input className="formFields" type="text" placeholder="Full Name" autoComplete="off" value={name} onChange={(e) => {setName(e.target.value); handleChange(e)}} />
          <p className="errorTxt hide">Full Name cannot be blank</p>
        </div>
        <div ref={emailId} className="flexColumn formSection">
          <input className="formFields" type="text" placeholder="Email" autoComplete="off" value={email} onChange={(e) => {setEmail(e.target.value); handleChange(e)}} />
          <p className="errorTxt hide">Email cannot be blank</p>
        </div>
      </div>
      <div className="formDiv">
        <div ref={numberId} className="flexColumn formSection">
          <input className="formFields" type="tel" placeholder="Phone Number" autoComplete="off" value={number} onChange={(e) => {setNumber(e.target.value); handlePhone(e.target.value); handleChange(e)}} />
          <p className="errorTxt hide">Phone Number cannot be blank</p>
        </div>
      </div>
      <div className="flexColumn">
        <div ref={appointmentTimeId} className="flexColumn">
          <Calendar ref={calendarId} year="" month="" day="" timeslots="" schedule="true"/>
          <p className="errorTxt hide">Please choose an available appointment time</p>
        </div>

        {/* Services */}
        <div className="flexColumn">
          <input className="formFields" type="text" placeholder="Type of Service" autoComplete="off" value={serviceType} onChange={(e) => {setServiceType(e.target.value)}} />
          
          <input className="formFields" type="text" placeholder="Client for Service" autoComplete="off" value={serviceClient} onChange={(e) => {setServiceClient(e.target.value)}} />
          
          <input className="formFields" type="text" placeholder="Price" autoComplete="off" value={servicePrice} onChange={(e) => {setServicePrice(e.target.value)}} />
        </div>

        <div ref={specialRequestsId} className="flexColumn">
          <input className="formFields" type="text" placeholder="Special Requests" autoComplete="off" value={specialRequests} onChange={(e) => {setSpecialRequests(e.target.value)}} />
        </div>
        <button className="formBtn" type="submit">Submit</button>
      </div>

      {/* <Popup trigger={success} setTrigger={setSuccess}>
      </Popup> */}
    </form>
  );
};

export default ReservationForm;
