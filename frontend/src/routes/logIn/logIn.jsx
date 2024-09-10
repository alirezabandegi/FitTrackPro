import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../provider';
import style from "./logIn.module.css";

export default function LogIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/logIn", { email, password })
        .then(result => {
            if(result.data.data === "Success"){
                setUser(result.data.user);
                navigate("/user/dashboard");
            }
            else{
                emailInput.style.border = "solid 2px red";
                passwordInput.style.border = "solid 2px red";
                alert(result.data);
            }
        })
        .catch(err => console.log(err));
    }

    return(
        <div className={style.logInContainer}>
            <h1>Login</h1>
            
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" id="emailInput" className={style.input} onChange={(e) => setEmail(e.target.value)} autocomplete="off" required/>
                <input type="password" name="password" placeholder="Password" id="passwordInput" className={style.input} onChange={(e) => setPassword(e.target.value)} minlength="8" required/>

                <button type="submit" className={style.submit}>Login</button>
            </form>
            <p>Don't have an account?</p>
            <Link to="/signUp" className={style.linkToSignUpPage}>Sign Up</Link>
        </div>
    );
}