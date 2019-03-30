const mongoose = require('mongoose');
const { Schema } = mongoose;

const googleUserSchema = new Schema({
    googleId: String,
    type: String,
    aplliedJobs: []
});

mongoose.model('googleUsers', googleUserSchema);