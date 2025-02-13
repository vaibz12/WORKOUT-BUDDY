const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET all workouts
const getAllWorkouts = async (req, res) => {
    // leave empty object since we want all docs
    const workouts = await Workout.find({}).sort({createdAt: -1}); 

    res.status(200).json(workouts);
};

// GET a single workout by ID
const getWorkout = async (req, res) => {
    const id = req.params.id; 

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'});
    }

    const workout = await Workout.findById(id);

    if (!workout){
        return res.status(404).json({error: 'No such workout'});
    }

    // if it exists, send it
    res.status(200).json(workout);

};

// CREATE a new workout
const createWorkout = async (req,res)=>{
    const {title,load,reps} = req.body;

    let emptyFields = [] //init to array - it stores the fields which are empty
    
    if (!title){emptyFields.push('title')}
    if (!load){emptyFields.push('load')}
    if (!reps){emptyFields.push('reps')}

    if (emptyFields.length > 0){
        return res.status(400).json({ error: 'Please fill all the fields', emptyFields})
    }


    // add workout to db
    try{
        const workout = await Workout.create({title, load, reps});
        res.status(200).json(workout);
    }
    catch(err){
        res.status(400).json({error: err.message});
        // console.log(err);
    }

    // res.json({msg: 'POST a new workout'});
}

// DELETE a workout by ID
const deleteWorkoutById = async (req, res) => {
    const id = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'});
    }

    const workout = await Workout.findOneAndDelete({_id: id});

    if (!workout){
        return res.status(404).json({error:'No such workout'});
    }

    res.status(200).json(workout);
    

};

// UPDATE a workout by ID
const updateWorkoutById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'});
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body   //spread operator
    })

    if (!workout){
        return res.status(404).json({error:'No such workout'});
    }

    res.status(200).json(workout);
};


// Export the controller functions
module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkoutById,
    deleteWorkoutById,
};
