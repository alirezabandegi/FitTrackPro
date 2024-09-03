import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./logIn.module.css";

export default function LogIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/logIn", { email, password })
        .then(result => {
            console.log(result);
            if(result.data === "Success"){
                navigate("/user/dashboard");
            }
            else{
                navigate("/signUp")
                alert("You are not registered to this service")
            }
        })
        .catch(err => console.log(err));
    }

    return(
        <div className={style.logInContainer}>
            <h1>Login</h1>
            
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" className={style.input} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" name="password" placeholder="Password" className={style.input} onChange={(e) => setPassword(e.target.value)} minlength="8" required/>

                <button type="submit" className={style.submit}>Login</button>
            </form>
            <p>Don't have an account?</p>
            <Link to="/signUp" className={style.linkToSignUpPage}>Sign Up</Link>
        </div>
    );
}