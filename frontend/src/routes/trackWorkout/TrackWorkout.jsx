import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import style from "./trackWorkout.module.css";
import DefultWorkoutSVG from "../../assets/gymSVGS/gym.svg";


export default function TrackWorkout(){
    const navigate = useNavigate();
    const { tokenVerify } = useOutletContext();

    useEffect(() => {
        if(!tokenVerify){
            navigate("/login")
        }
    }, [navigate, tokenVerify])

    return(
        <section className={style.trackWorkoutSection}>
            <div className={style.startWorkoutSection}>
                <div>Workout Duration: 25min</div>
                
                <button>Start Workout</button>
            </div>
            
            <input type="text" name="search" placeholder="Search" className={style.searchWorkout}/>

            <div className={style.chosenWorkoutDetails}>
                <div className={style.chosenWorkoutImgandName}>
                    <img src={DefultWorkoutSVG} alt="Workout img" />
                    
                    <h1>Name of Workout</h1>
                </div>

                <div className={style.setsSection}>
                    <div className={style.setSection}>
                        <h2>Set 1</h2>
                        <div>
                            <div>Repetitions:</div>
                            <input type="text" name="repetitions1" />
                        </div>

                        <div>
                            <div>Weight:</div>
                            <input type="text" name="weight1" />
                        </div>
                    </div>

                    <button className={style.addSetbutton}>+</button>
                </div>
            </div>

            
        </section>
    );
}