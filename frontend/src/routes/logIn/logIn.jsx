import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios"; // Axios for making HTTP requests
import style from "./logIn.module.css";

export default function LogIn(){
    const navigate = useNavigate(); // Initialize useNavigate for redirecting users after login
    const { handleLogOut } = useOutletContext();

    // State to hold form input data (email and password)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Update state when form inputs change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior (page reload)
        try {
            // Send POST request to login API endpoint with form data
            await axios.post('http://localhost:3000/api/auth/login', formData, { withCredentials: true });
            alert('Login successful');
            handleLogOut(true)
            navigate("/user/dashboard"); // Redirect user to the dashboard after successful login
        } catch (error) {
            // Handle errors that occur during login
            if (error.response) {
                // If the server responds with an error status
                alert(error.response.data.error); // Show the error message from the response
            } else if (error.request) {
                // If no response is received from the server
                alert('No response from server. Please try again later.');
            } else {
                // Handle other errors
                alert('Error: ' + error.message); // Display the error message
            }
        }
    };

    return(
        <div className={style.logInContainer}>
            <h1>Login</h1>
            
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" className={style.input} onChange={handleChange} autoComplete="off" required/>
                <input type="password" name="password" placeholder="Password" className={style.input} onChange={handleChange} minLength="8" required/>

                <button type="submit" className={style.submit}>Login</button>
            </form>

            {/* Link to the sign-up page */}
            <p>Don't have an account?</p>
            <Link to="/signUp" className={style.linkToSignUpPage}>Sign Up</Link>
        </div>
    );
}