import { useState, useEffect } from "react";
import { Link, Outlet, useLocation} from "react-router-dom"
import LogOutButton from "../../components/logOutButton/LogOutButton"
import axios from 'axios';
import style from "./rootLayout.module.css"

export default function RootLayout(){
    const [tokenVerify, setTokenVerify] = useState(false);

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

    return(
        <div className={style.rootLayout}>
            <header className={style.mainHeader}>
                <Link to="/" className={`${style.resetLink} ${style.mainHeaderLogo}`}>FitTrackPro</Link>
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
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}