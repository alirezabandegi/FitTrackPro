import { useState, useEffect } from "react";
import { Link, Outlet, useLocation} from "react-router-dom"
import LogOutButton from "../../components/logOutButton/LogOutButton"
import axios from 'axios';
import style from "./rootLayout.module.css"

export default function RootLayout(){
    const [tokenVerify, setTokenVerify] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        (
            async () => {
                try {
                    await axios.get('http://localhost:3000/api/auth/user', { withCredentials: true })
                    .then(response => response.data.tokenverify ? setTokenVerify(true) : setTokenVerify(false));
                } catch (error) {
                    setTokenVerify(false)
                    console.log(error)
                }
            }
        )();
    })

    const isUserPage = useLocation().pathname.startsWith('/user/');

    const handleLogOut = (value) => {
        setTokenVerify(value)
    }
    
    const handleMenu = () => {
        setMenuVisible(!menuVisible);
    }

    return(
        <div className={style.rootLayout}>
            <header className={style.mainHeader}>
                <Link to="/" className={`${style.resetLink} ${style.mainHeaderLogo}`}>FitTrackPro</Link>
                <div style={{ display: menuVisible ? 'flex' : 'none' }}>
                    {isUserPage && tokenVerify && (
                        <>
                            <Link to="/user/dashboard" className={`${style.resetLink} ${style.userLinks}`}>Dashboard</Link>
                            <Link to="/user/progress" className={`${style.resetLink} ${style.userLinks}`}>Progress</Link>
                            <Link to="/user/trackWorkout" className={`${style.resetLink} ${style.userLinks}`}>Track Workout</Link>
                            <Link to="/user/settings" className={`${style.resetLink} ${style.userLinks}`}>Settings</Link>
                        </>
                    )}

                    <div>
                        <Link to="/privacypolicy" className={`${style.resetLink} ${style.mainHeaderPrivacyButton}`}>Privacy Policy</Link>
                        { tokenVerify ? <LogOutButton handleLogOut={handleLogOut}/>
                        : <Link to="/login" className={`${style.resetLink} ${style.mainHeaderlogInButton}`}>Log In</Link>
                        }
                    </div>
                </div>

                {isUserPage && tokenVerify && (
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
                            <animate dur="0.001s" attributeName="width" values="0;10" fill="freeze" begin="reverse.begin" /></rect>
                    </svg>
                )}
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}