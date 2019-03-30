const passport = require('passport');
const mongoose = require('mongoose');
//const checkLoginStatus = require('../middlewares/checkLoginStatus');


const Jobs = mongoose.model('jobs');
const Local = mongoose.model('localUsers');
const User = mongoose.model('googleUsers');

module.exports = app => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  //for logging in
  app.post('/api/login',
    passport.authenticate('local', {
      failureRedirect: '/api/login'
    }),
    (req, res) => {
      res.redirect('/api/current_user');
    });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/jobs', async (req, res) => {
    try {
      const jobs = await Jobs.find();
      res.send({
        jobs
      });
    } catch (err) {
      console.log(err);
    }
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/api/current_user');
  });

  app.post('/api/apply', async (req, res) => {
    try {
      await Jobs.updateOne({ _id: req.body.apply.jobID },
        {$set: {"done":true}}).exec();

        const jobs = await Jobs.find();
      res.status(200).send({
        jobs
      });
    } catch (err) {
      console.log(err);
    }
  });

  app.post('/api/addNew', async (req, res) => {
    try {
      await new Jobs({ 
        "userID" : req.body.userID,
          "title" : req.body.title,
          "details" : req.body.details,
          "done" : req.body.done
      }).save()
    } catch (err) {
      console.log(err);
    }
  });
};