require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

//express app
const app = express();

// middleware
app.use(express.json());

app.use((req,res,next)=>{
    console.log('Path:',req.path,'  Method:' ,req.method);
    next();
});

// Routes
app.use('/api/workouts',workoutRoutes);

// connect to DB
mongoose.connect(process.env.MONGOURI)
    .then(
        // Listen at port 4000
        app.listen(process.env.PORT, ()=>{
            console.log('Listening on port 4000');
        })
    )
    .catch((err)=>console.log('Could not connect \n',err))


