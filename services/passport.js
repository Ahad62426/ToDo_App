const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const Local = mongoose.model('localUsers');
const User = mongoose.model('googleUsers');


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
  const googleUser = await User.findById(id);
  const localUser = await Local.findById(id);
  if(googleUser){
    return done(null, googleUser);
  }
  else if(localUser){
    return done(null, localUser);
  }
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, 
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id })
    if (existingUser){
      return done(null, existingUser);
    }
    const user = await new User({ googleId: profile.id, type: 'user' }).save()
    done(null, user);
  })
);


passport.use(new LocalStrategy({
  usernameField: 'email'
},
  async (username, password, done) => {
    try {
      let user = await Local.findOne({ email: username, password });
      if (user) {
        return done(null, user);
      }
      // user = await new Local({ email: username, password, type: 'user' }).save()
      // return done(null, user);
    } catch (err) {
      console.log(err);
    }
  }
));