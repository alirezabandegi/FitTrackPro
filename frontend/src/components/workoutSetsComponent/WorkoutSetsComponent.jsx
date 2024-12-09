import style from "./workoutSetsComponent.module.css";

const WorkoutSetsComponent = (props) => {
    const { workoutValue, exerciseIndex, index, handleExercises } = props;
    const exercise = workoutValue.exercises[exerciseIndex];
    const set = exercise.sets[index];

    return (
        <>
            <h2 className={style.set}>Set {index + 1}</h2>
            <div>
                <div>Repetitions:</div>
                <input
                    type="number"
                    name="repetitions"
                    value={set.repetitions || 0}
                    onChange={(e) => handleExercises(e, exerciseIndex, index)}
                />
            </div>

            <div>
                <div>Weight:</div>
                <input
                    type="number"
                    name="weight"
                    value={set.weight || 0}
                    onChange={(e) => handleExercises(e, exerciseIndex, index)}
                />
            </div>

            <div>
                <div>Set Duration(Min):</div>
                <input
                    type="number"
                    name="set_duration"
                    value={set.set_duration || 0}
                    onChange={(e) => handleExercises(e, exerciseIndex, index)}
                />
            </div>
        </>
    );
};

export default WorkoutSetsComponent;