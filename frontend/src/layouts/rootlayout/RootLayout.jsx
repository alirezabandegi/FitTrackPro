import { useState, useEffect } from "react";
import { Link, Outlet} from "react-router-dom"
import LogOutButton from "../../components/logOutButton/LogOutButton" // LogOutButton component
import axios from 'axios'; // HTTP client for making API requests
import style from "./rootLayout.module.css"

export default function RootLayout(){
    // State to track if the user's token is verified
    const [tokenVerify, setTokenVerify] = useState(false);

    // State to track the visibility of the navigation menu (depends on screen width)
    const [menuVisible, setMenuVisible] = useState(window.innerWidth > 878);

    // State to track if the user manually toggled the menu
    const [userToggledMenu, setUserToggledMenu] = useState(false);

    // Function to update menu visibility based on screen size
    const updateMenuVisibility = () => {
        const screenWidth = window.innerWidth;

        // Show the menu if the screen width is greater than 878px
        if (screenWidth > 878) {
            setMenuVisible(true);
        }
        // Hide the menu if screen is smaller and user hasn't manually toggled it
        else if (!userToggledMenu) {
            setMenuVisible(false);
        }
    };

    // Check token validity when component mounts
    useEffect(() => {
        (
            async () => {
                try {
                    // Make a request to the backend to verify the token
                    await axios.get('http://localhost:3000/api/auth/user', { withCredentials: true })
                    .then(response => response.data.tokenverify ? setTokenVerify(true) : setTokenVerify(false));
                } catch (error) {
                    setTokenVerify(false) // If there's an error, assume the token is invalid
                    console.log(`TokenVerify: ${error.message}`) // Log the error
                }
            }
        )();
    })
    
    // Update menu visibility on window resize
    useEffect(() => {
        updateMenuVisibility();

        // Add an event listener for window resize events
        window.addEventListener("resize", updateMenuVisibility);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener("resize", updateMenuVisibility);
    }, [userToggledMenu]) // Re-run when user manually toggles menu

    // Handler for logout button click, updates token verification state
    const handleLogOut = (value) => {
        setTokenVerify(value)
    }
    
    // Handler for the menu toggle button, shows/hides menu on small screens
    const handleMenu = () => {
        if (window.innerWidth <= 878) {
            setMenuVisible(!menuVisible);
            setUserToggledMenu(!menuVisible); // Track whether the user manually toggled the menu
        }
    }

    return(
        <div className={style.rootLayout}>
            <header className={style.mainHeader}>
                <Link to="/" className={`${style.resetLink} ${style.mainHeaderLogo}`}>FitTrackPro</Link>
                <div style={{ display: menuVisible ? 'flex' : 'none' }}>
                    <Link to="/user/dashboard" className={`${style.resetLink} ${style.userLinks}`}>Dashboard</Link>
                    <Link to="/user/progress" className={`${style.resetLink} ${style.userLinks}`}>Progress</Link>
                    <Link to="/user/trackWorkout" className={`${style.resetLink} ${style.userLinks}`}>Track Workout</Link>
                    <Link to="/user/settings" className={`${style.resetLink} ${style.userLinks}`}>Settings</Link>

                    <div>
                        <Link to="/privacypolicy" className={`${style.resetLink} ${style.mainHeaderPrivacyButton}`}>Privacy Policy</Link>
                        { tokenVerify ? <LogOutButton handleLogOut={handleLogOut}/>
                        : <Link to="/login" className={`${style.resetLink} ${style.mainHeaderlogInButton}`}>Log In</Link>
                        }
                    </div>
                </div>

                <svg onClick={handleMenu} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" stroke="#eee" strokeWidth=".6" fill="rgba(0,0,0,0)" strokeLinecap="round" className={style.menuSVG}>
                    <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
                        <animate dur="0.2s" attributeName="d" values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7" fill="freeze" begin="start.begin" />
                        <animate dur="0.2s" attributeName="d" values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7" fill="freeze" begin="reverse.begin" />
                    </path>
                    <rect width="10" height="10" stroke="none">
                        <animate dur="2s" id="reverse" attributeName="width" begin="click" />
                    </rect>
                    <rect width="10" height="10" stroke="none">
                        <animate dur="0.001s" id="start" attributeName="width" values="10;0" fill="freeze" begin="click" />
                        <animate dur="0.001s" attributeName="width" values="0;10" fill="freeze" begin="reverse.begin" />
                    </rect>
                </svg>
            </header>

            {/* Main content area where nested routes are rendered */}
            <main>
                <Outlet context={{ tokenVerify, handleLogOut }} />
            </main>
        </div>
    );
}