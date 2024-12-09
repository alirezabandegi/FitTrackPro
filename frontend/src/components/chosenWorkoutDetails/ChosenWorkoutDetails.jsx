import React, { useState } from "react";
import WorkoutSetsComponent from "../workoutSetsComponent/WorkoutSetsComponent";
import DefultWorkoutSVG from "../../assets/gymSVGS/gym.svg";
import style from "./chosenWorkoutDetails.module.css";

const ChosenWorkoutDetails = (props) => {
    const { workoutValue, index, setWorkoutValue, handleExercises } = props;
    const [workoutSetsComponent, setWorkoutSetsComponent] = useState([0]);

    // Add a new set to the exercise
    const handleSetsButton = () => {
        setWorkoutSetsComponent((prev) => [...prev, prev.length]);

        setWorkoutValue((prevState) => {
            const updatedExercises = prevState.exercises.map((exercise, exIdx) => {
                if (exIdx === index) {
                    return {
                        ...exercise,
                        sets: [...exercise.sets, { repetitions: "", weight: "", set_duration: "" }]
                    };
                }
                return exercise;
            });

            return {
                ...prevState,
                exercises: updatedExercises,
            };
        });
    };

    return (
        <div className={style.chosenWorkoutDetails}>
            <div className={style.chosenWorkoutImgandName}>
                <img src={DefultWorkoutSVG} alt="Workout img" />
                <h1>{props.exerciseName}</h1>
            </div>

            <div className={style.setsSection}>
                <div className={style.setSection}>
                    {workoutSetsComponent.map((setIndex) => (
                        <WorkoutSetsComponent
                            key={setIndex}
                            index={setIndex}
                            exerciseIndex={props.index}
                            workoutValue={workoutValue}
                            handleExercises={handleExercises}
                        />
                    ))}
                </div>

                <button className={style.addSetbutton} onClick={handleSetsButton}>
                    +
                </button>
            </div>
        </div>
    );
};

export default ChosenWorkoutDetails;