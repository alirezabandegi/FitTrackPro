import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./signUp.module.css";

export default function SignUp(){
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/auth/signup', formData);
            alert('User registered successfully');
            navigate("/logIn");
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
        <div className={style.signUpContainer}>
            <h1>Welcome</h1>
            <p><strong>Let's create your account!</strong></p>
            
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" className={style.input} onChange={handleChange} autoComplete="off" required/>
                <input type="email" name="email" placeholder="Email" className={style.input} onChange={handleChange} autoComplete="off" required/>
                <input type="password" name="password" placeholder="Password" className={style.input} onChange={handleChange} minLength="8" required/>

                <button type="submit" className={style.submit}>Sign Up</button>
            </form>
            <p>Already have an account?</p>
            <Link to="/logIn" className={style.linkToLogInPage}>Login</Link>
        </div>
    );
}