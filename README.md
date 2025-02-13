Workout Buddy
Manage workouts using this app!

This is an app built using the MERN stack, which uses a Nodejs backend and React frontend. You can add new workouts, delete workouts, etc.
I built this following this video tuturorial by Net Ninja

To run
Firstly you want to make sure that all the node modules are installed.
Simply go to each folder and run npm install and it will install the right packages using package.json

In backend make a .env file with the following format:

PORT=4000
MONGOURI={your mongo URI goes here}
The MONGOURI should be of the form mongodb+srv://{user-id}:{pwd}@{domain}

To run this, open two separate terminals with this repository

On one of them run the following:

cd backend
npm run dev

On the other run the following:

cd frontend
npm start
