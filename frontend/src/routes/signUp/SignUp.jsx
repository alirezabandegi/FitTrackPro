import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./signUp.module.css";

export default function SignUp(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/signUp", { name, email, password })
        .then(result => {
            if(result.data === "Success"){
                navigate("/logIn");
            }
            else{
                const emailInput = document.getElementById("emailInput");
                emailInput.style.border = "solid 2px red";
                alert(result.data);
            }
        })
        .catch(err => console.log(err));
    }

    return(
        <div className={style.signUpContainer}>
            <h1>Welcome</h1>
            <p><strong>Let's create your account!</strong></p>
            
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" className={style.input} onChange={(e) => setName(e.target.value)} autocomplete="off" required/>
                <input type="email" name="email" placeholder="Email" id="emailInput" className={style.input} onChange={(e) => setEmail(e.target.value)} autocomplete="off" required/>
                <input type="password" name="password" placeholder="Password" className={style.input} onChange={(e) => setPassword(e.target.value)} minlength="8" required/>

                <button type="submit" className={style.submit}>Sign Up</button>
            </form>
            <p>Already have an account?</p>
            <Link to="/logIn" className={style.linkToLogInPage}>Login</Link>
        </div>
    );
}