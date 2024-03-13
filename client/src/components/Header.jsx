import { useState, useEffect} from "react";
import Auth from "../../utils/auth";

function Header() {
    const [home, setHome] = useState(false);
    const [portal, setPortal] = useState(false);
    const [reservations, setreservations] = useState(false);


    const pageSelection = () => {
        const page = window.location.pathname;
        page == "/" ? setHome(true) : setHome(false);
        page == "/login-or-signup" ? setPortal(true) : setPortal(false);
        page == "/reservations" ? setreservations(true) : setreservations(false);
    };

    useEffect(() => {
        pageSelection();
    }, [home, portal, reservations])
    
    // {home ? "highlight menuBarText" : "menuBarText"}
    return (
    <header>
    <nav className="menu">
        <a href="/" className={home ? "highlight menuBarText" : "menuBarText"}>Home</a>
        <a href="/login-or-signup" className={portal ? "highlight menuBarText" : "menuBarText"}>Login/Signup</a>
        <a href="/reservations" className={reservations ? "highlight menuBarText" : "menuBarText"}>Reservations</a>
    </nav>
    </header>
    );
  }
  
  export default Header;