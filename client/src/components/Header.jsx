import { useState, useEffect} from "react";
import Auth from "../../utils/auth";
import Settings_Icons from "../assets/settings_icon.svg";

function Header() {
    const [currDate, setDate] = useState("");
    const [home, setHome] = useState(false);
    const [portal, setPortal] = useState(false);
    const [reservations, setReservations] = useState(false);
    const [roster, setRoster] = useState(false);
    const [settings, setSettings] = useState(false);


    const pageSelection = () => {
        const page = window.location.pathname;
        page == "/" ? setHome(true) : setHome(false);
        page == "/login-or-signup" ? setPortal(true) : setPortal(false);
        page == "/reservations" ? setReservations(true) : setReservations(false);
        page == "/employee-roster" ? setRoster(true) : setRoster(false);
        page == "/settings" ? setSettings(true) : setSettings(false);
    };

    useEffect(() => {
        pageSelection();
        getCurrentDate();
    }, [home, portal, reservations, roster, settings])
    
    const getCurrentDate = () => {
        const monthsOfYear = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        const daysOfWeek = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDay();
        
        const displayDate = `${daysOfWeek[currentDay]}, ${monthsOfYear[currentMonth]} ${currentDate.getDate()} (${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()})`

        setDate(displayDate);
    }

    const userCheck = () => {
        let user = Auth.getProfile();
        let position = user.data ? user.data.position : "Invalid";
        if(position == "Admin" || position == "Boss") {
            return (
            <a href="/settings" className={settings ? "highlight menuBarText" : "menuBarText"}><img className="settingsIcon" src={Settings_Icons}></img></a>
        )};
    }

    return (
    <header>
        {/* if user is logged in show profile and logout buttons */}
        {Auth.loggedIn() ? (
            <nav className="menu">
            <p>{currDate}</p>
            <a href="/" className={home ? "highlight menuBarText" : "menuBarText"}>Home</a>
            <a href="/reservations" className={reservations ? "highlight menuBarText" : "menuBarText"}>Reservations</a>
            <a href="/employee-roster" className={roster ? "highlight menuBarText" : "menuBarText"}>Employee Roster</a>
            <a href="/" className="menuBarText" onClick={Auth.logout}>Logout</a>
            {userCheck()}
            </nav>
            ) : (
            <nav className="menu">
                <a href="/login-or-signup" className={portal ? "highlight menuBarText" : "menuBarText"}>Login/Signup</a>
            </nav>
        )}
        
    </header>
    );
  }
  
  export default Header;