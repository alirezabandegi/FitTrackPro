import axios from 'axios'; // Import axios for making HTTP requests
import style from "./logOutButton.module.css"

const LogOutButton = ({ handleLogOut }) => {
    // Function to handle logout process
    const handleLogout = async () => {
        try {
            // Send POST request to the logout endpoint, with credentials included (to handle cookies/session)
            await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });

            // Call the handleLogOut function in RootLayout.jsx and set the tokenVerify state to false
            handleLogOut(false)
            alert('Logged out successfully');
        } catch (error) {
            // Handle any errors that occur during the logout process
            alert('Error logging out');
        }
    };

    return (
        <button onClick={handleLogout} className={style.logOutButton}>Log Out</button>
    );
};

export default LogOutButton;
