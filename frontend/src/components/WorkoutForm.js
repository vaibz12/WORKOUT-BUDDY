import { useState } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutsContext';



const WorkoutForm = () =>{
    const { dispatch } = useWorkoutContext();

    const [title, setTitle]= useState('');
    const [load, setLoad]= useState('');
    const [reps, setReps]= useState('');
    const [error,setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (event)=>{
        event.preventDefault(); // to prevent the default action of form submission: refresh
    
        const workout = {title,load,reps};

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout), //changes workout to JSON string
            headers : {
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();

        if (!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        else{
            setError(null);
            // If it was ok-reset everything to empty string
            setTitle('');
            setLoad('');
            setReps('');
            // Reset empty fields:
            setEmptyFields([]);
            console.log('New workout added!');
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>
            <label>Exercise Title</label>
            <input 
                type="text"
                onChange={(event) => setTitle(event.target.value)} 
                value = {title} //update the content inside the form as the user updates it!
                className={emptyFields.includes('title') ? 'error': ''}
            />

            <label>Load(in kg)</label>
            <input 
                type="number"
                onChange={(event) => setLoad(event.target.value)} 
                value = {load} 
                className={emptyFields.includes('load') ? 'error': ''}
            />

            <label>Reps:</label>
            <input 
                type="number"
                onChange={(event) => setReps(event.target.value)} 
                value = {reps} 
                className={emptyFields.includes('reps') ? 'error': ''}
            />
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm;