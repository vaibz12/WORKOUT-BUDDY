const express = require('express');
const workoutController = require('../controllers/workoutController');

// Create a Router
const router = express.Router();

// GET all workouts!
router.get('/', workoutController.getAllWorkouts);

// GET single workout
router.get('/:id', workoutController.getWorkout)

// POST a new workout
router.post('/', workoutController.createWorkout);

// DELETE a workout
router.delete('/:id', workoutController.deleteWorkoutById);

// UPDATE a workout
router.patch('/:id', workoutController.updateWorkoutById);

module.exports = router;