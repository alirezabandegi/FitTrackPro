import { Link, Outlet } from "react-router-dom";

export default function RootLayout(){
    return(
        <div className="rootLayout">
            <header>
                <Link to="/">FitTrackPro</Link>
                <div>
                    <Link to="/privacypolicy">Privacy Policy</Link>
                    <Link to="/login">Log In</Link>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}