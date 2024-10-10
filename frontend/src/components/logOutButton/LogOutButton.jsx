import axios from 'axios';
import style from "./logOutButton.module.css"

const LogOutButton = ({ handleLogOut }) => {
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
            handleLogOut(false)
            alert('Logged out successfully');
        } catch (error) {
            alert('Error logging out');
        }
    };

    return (
        <button onClick={handleLogout} className={style.logOutButton}>Log Out</button>
    );
};

export default LogOutButton;
