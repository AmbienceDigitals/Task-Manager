const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');


// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes 
app.use('/api/v1/tasks', tasks)
// display when route does not exist
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

// function to start the server only if connected to the database
const start =  async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()