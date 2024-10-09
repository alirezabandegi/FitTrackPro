import axios from 'axios';

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
        <button onClick={handleLogout}>Log Out</button>
    );
};

export default LogOutButton;
