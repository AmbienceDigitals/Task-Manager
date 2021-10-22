const mongoose = require('mongoose');

// creating a database schema
const TaskSchema = new mongoose.Schema({
    // adding validation to schema
    name: {
        type: String,
        required: [true, "must provide a name"],
        trim: true,
        // maxLength: [20, "name cannot be more than 20n characters"]
    },
    completed: {
        type: Boolean,
        default: false
    }
})



// creating a model
module.exports = mongoose.model('Task', TaskSchema)