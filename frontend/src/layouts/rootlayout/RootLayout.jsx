import { Link, Outlet } from "react-router-dom";
import style from "./rootLayout.module.css"

export default function RootLayout(){
    return(
        <div className={style.rootLayout}>
            <header className={style.mainHeader}>
                <Link to="/" className={`${style.resetLink} ${style.mainHeaderLogo}`}>FitTrackPro</Link>
                <div>
                    <Link to="/privacypolicy" className={`${style.resetLink} ${style.mainHeaderPrivacyButton}`}>Privacy Policy</Link>
                    <Link to="/login" className={style.resetLink}>Log In</Link>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}