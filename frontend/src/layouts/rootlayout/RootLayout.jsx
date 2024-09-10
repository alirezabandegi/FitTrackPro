import { Link, Outlet, useLocation } from "react-router-dom";
import style from "./rootLayout.module.css"

export default function RootLayout(){
    const isUserPage = useLocation().pathname.startsWith('/user/');

    return(
        <div className={style.rootLayout}>
            <header className={style.mainHeader}>
                <Link to="/" className={`${style.resetLink} ${style.mainHeaderLogo}`}>FitTrackPro</Link>
                {isUserPage && (
                    <>
                        <Link to="/user/dashboard" className={`${style.resetLink} ${style.userLinks}`}>Dashboard</Link>
                        <Link to="/user/progress" className={`${style.resetLink} ${style.userLinks}`}>Progress</Link>
                        <Link to="/user/trackWorkout" className={`${style.resetLink} ${style.userLinks}`}>Track Workout</Link>
                        <Link to="/user/settings" className={`${style.resetLink} ${style.userLinks}`}>Settings</Link>
                    </>
                )}
                <div>
                    <Link to="/privacypolicy" className={`${style.resetLink} ${style.mainHeaderPrivacyButton}`}>Privacy Policy</Link>
                    <Link to="/login" className={`${style.resetLink} ${style.mainHeaderlogInButton}`}>Log In</Link>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}