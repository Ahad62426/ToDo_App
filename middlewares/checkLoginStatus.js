const mongoose = require('mongoose');
//mongoose [passport]
const User = mongoose.model('localUsers');
module.exports = async (req, res, next) => {
    const { email, password } = req.body;
    const usr = await User.findOne({ email, password });
    if(!usr){
        res.send(false);
    } 
    next();

};