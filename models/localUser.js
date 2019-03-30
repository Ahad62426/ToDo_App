const mongoose = require('mongoose');
const { Schema } = mongoose;

const localUserSchema = new Schema(
    {
        email: String,
        password: String,
        type: String,
        aplliedJobs: []
    }
);

mongoose.model('localUsers', localUserSchema);