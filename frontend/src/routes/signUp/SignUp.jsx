import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./signUp.module.css";

export default function SignUp(){
    const navigate = useNavigate(); // Initialize useNavigate for redirecting users after sign-up

    // State to hold form input data (name, email, and password)
    const [formData, setFormData] = useState({
        name: '',
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
            // Send POST request to sign-up API endpoint with form data
            await axios.post('http://localhost:3000/api/auth/signup', formData);
            alert('User registered successfully');
            navigate("/logIn"); // Redirect user to the login page after successful sign-up
        } catch (error) {
            // Handle errors that occur during sign-up
            if (error.response) {
                // If the server responds with an error status
                alert(error.response.data.error); // Show the error message from the response
            } else if (error.request) { // If no response is received from the server
                alert('No response from server. Please try again later.');
            } else {
                // Handle other errors
                alert('Error: ' + error.message); // Display the error message
            }
        }
    };

    return(
        <div className={style.signUpContainer}>
            <h1>Welcome</h1>
            <p><strong>Let's create your account!</strong></p>
            
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" className={style.input} onChange={handleChange} autoComplete="off" required/>
                <input type="email" name="email" placeholder="Email" className={style.input} onChange={handleChange} autoComplete="off" required/>
                <input type="password" name="password" placeholder="Password" className={style.input} onChange={handleChange} minLength="8" required/>

                <button type="submit" className={style.submit}>Sign Up</button>
            </form>

            {/* Link to the login page */}
            <p>Already have an account?</p>
            <Link to="/logIn" className={style.linkToLogInPage}>Login</Link>
        </div>
    );
}