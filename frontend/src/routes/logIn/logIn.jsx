import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./logIn.module.css";

export default function LogIn(){
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/auth/login', formData, { withCredentials: true });
            alert('Login successful');
            navigate("/user/dashboard");
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error);
            } else if (error.request) {
                alert('No response from server. Please try again later.');
            } else {
                alert('Error: ' + error.message);
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
            <p>Don't have an account?</p>
            <Link to="/signUp" className={style.linkToSignUpPage}>Sign Up</Link>
        </div>
    );
}