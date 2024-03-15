import { useState, useEffect} from "react";
import Auth from "../../utils/auth";

function Header() {
    const [home, setHome] = useState(false);
    const [portal, setPortal] = useState(false);
    const [reservations, setReservations] = useState(false);
    const [roster, setRoster] = useState(false);


    const pageSelection = () => {
        const page = window.location.pathname;
        page == "/" ? setHome(true) : setHome(false);
        page == "/login-or-signup" ? setPortal(true) : setPortal(false);
        page == "/reservations" ? setReservations(true) : setReservations(false);
        page == "/employee-roster" ? setRoster(true) : setRoster(false);
    };

    useEffect(() => {
        pageSelection();
    }, [home, portal, reservations, roster])
    
    return (
    <header>
        {/* if user is logged in show profile and logout buttons */}
        {Auth.loggedIn() ? (
            <nav className="menu">
            <a href="/" className={home ? "highlight menuBarText" : "menuBarText"}>Home</a>
            <a href="/reservations" className={reservations ? "highlight menuBarText" : "menuBarText"}>Reservations</a>
            <a href="/employee-roster" className={roster ? "highlight menuBarText" : "menuBarText"}>Employee Roster</a>
            <a href="/" className="menuBarText" onClick={Auth.logout}>Logout</a>
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