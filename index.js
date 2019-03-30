const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');



mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
require('./models/googleUser');
require('./models/localUser');
require('./models/jobs');
require('./services/passport');
//require('./services/passportLocal');

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5001;
app.listen(PORT);