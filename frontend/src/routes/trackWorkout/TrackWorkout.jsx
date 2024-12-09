import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import style from "./trackWorkout.module.css";
import workoutData from "./workoutNames.json";
import ChosenWorkoutDetails from "../../components/chosenWorkoutDetails/ChosenWorkoutDetails";


export default function TrackWorkout(){
    const navigate = useNavigate();
    const { tokenVerify } = useOutletContext();
    
    // Redirect user to login if token verification fails
    useEffect(() => {
        if(!tokenVerify){
            navigate("/login")
        }
    }, [navigate, tokenVerify])
    
    // Initialize workout state
    const [workoutValue, setWorkoutValue] = useState({duration: "-", 
                                                    calories_burned: "0",
                                                    notes: "",
                                                    exercises: [],
                                                    start_date: null,
                                                    end_date: null });

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSearchSuggestions, setFilteredSearchSuggestions] = useState([]);

    // Combine all workout data for default suggestions
    const defaultSearchSuggestions = [
        ...workoutData.workouts.strength_training,
        ...workoutData.workouts.cardio,
        ...workoutData.workouts.flexibility,
        ...workoutData.workouts.core,
        ...workoutData.workouts.yoga,
        ...workoutData.workouts.powerlifting,
        ...workoutData.workouts.crossfit,
        ...workoutData.workouts.bodyweight
    ];

    // Handle search term change and filter suggestions
    const handleSearchChange = (e) => {
        const input = e.target.value;
        setSearchTerm(input);

        // Filter default suggestions based on input
        if (input) {
            const matchingSuggestions = defaultSearchSuggestions.filter((text) =>
                text.toLowerCase().includes(input.toLowerCase())
            );

            setFilteredSearchSuggestions(matchingSuggestions.length > 0 ? matchingSuggestions : [input]);
        } else {
            setFilteredSearchSuggestions([]);
        }
    };

    // Handle input changes for exercises
    const handleExercises = (e, exerciseIndex, setIndex) => {
        const { name, value } = e.target;
    
        setWorkoutValue((prevState) => {
            const updatedExercises = prevState.exercises.map((exercise, exIdx) => {
                if (exIdx === exerciseIndex) {
                    return {
                        ...exercise,
                        sets: exercise.sets.map((set, setIdx) => {
                            if (setIdx === setIndex) {
                                return {
                                    ...set,
                                    [name]: value,
                                };
                            }
                            return set;
                        }),
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
    
    // Handle the addition of a new exercise
    const handleSearchAddButton = () => {
        const newExercise = {
            exercise_name: searchTerm,
            sets: [{ repetitions: "", weight: "", set_duration: "" }],
        };
    
        setWorkoutValue((prevState) => ({
            ...prevState,
            exercises: [newExercise, ...prevState.exercises], // Add new exercise to the top of the list
        }));
    
        setSearchTerm("");
        setFilteredSearchSuggestions([]);
    };

    return(
        <section className={style.trackWorkoutSection}>
            <div className={style.startWorkoutSection}>
                <div>Workout Duration: <b>{workoutValue.duration}</b></div>
                
                <button>Start Workout</button>
            </div>
            
            <div className={style.searchWorkoutContainer}>
                <input 
                type="text"
                name="search"
                placeholder="Search"
                value={searchTerm}
                className={`${style.searchWorkout} ${searchTerm ? style.searchWorkoutActive : ""}`}
                onChange={handleSearchChange}/>

                <button className={`${style.searchAddButton} ${searchTerm ? style.searchAddButtonActive : ""}`} onClick={handleSearchAddButton}>Add</button>
                
                {filteredSearchSuggestions.length > 0 && (
                    <div className={style.suggestionsContainer}>
                        {filteredSearchSuggestions.map((suggestion, index) => (
                            <div key={index} className={style.suggestionItem} onClick={() => setSearchTerm(suggestion)}>
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {workoutValue.exercises.map((exercise, index) => (
                <ChosenWorkoutDetails 
                    key={index}
                    index={index}
                    exerciseName={exercise.exercise_name}
                    workoutValue={workoutValue}
                    setWorkoutValue={setWorkoutValue}
                    handleExercises={handleExercises} 
                /> 
            ))}
             
        </section>
    );
}