const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobsSchema = new Schema({
    userID: String,
    title: String,
    details: String,
    done: Boolean
});

mongoose.model('jobs', jobsSchema);