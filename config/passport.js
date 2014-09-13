'use strict';

var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GitHubStrategy = require('passport-github').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    LinkedinStrategy = require('passport-linkedin').Strategy,
    Admin = mongoose.model('Admin'),
    Korisnik = mongoose.model('Korisnik'),
    config = require('./config');

module.exports = function(passport) {



     // Serialize the admin id to push into the session
    passport.serializeUser(function(user, done) {

              done(null, user.id);


    });

    // Deserialize the admin object based on a pre-serialized token
    // which is the admin id
    passport.deserializeUser(function(id, done) {

         Admin.findOne( { _id: id }, function(err, korisnik){
           if(err) done(err);
             if(korisnik){
               done(null, korisnik);
             } else {
                Korisnik.findOne( {_id: id}, function(err, korisnik){
                if(err) done(err);
                done(null, korisnik);
             })
         }

      });

});

     // Lokalna strategija za admina
    passport.use('adminLocal', new LocalStrategy({
            usernameField: 'korisnickoIme',
            passwordField: 'lozinka'
        },
        function(korisnickoIme, lozinka, done) {

            Admin.findOne({
                korisnickoIme: korisnickoIme
            }, function(err, admin) {


                if (err) {
                    return done(err);
                }
                if (!admin) {
                    return done(null, false, {
                        message: 'Nepoznat administrator.'
                    });
                }
                if (!admin.authenticate(lozinka)) {
                    return done(null, false, {
                        message: 'Neispravna lozinka.'
                    });
                }
                return done(null, admin);
            });
        }
    ));

        // Lokalna strategija za korisnika
        passport.use('korisnikLocal', new LocalStrategy({
              usernameField: 'korisnickoIme',
              passwordField: 'lozinka'
          },
          function(korisnickoIme, lozinka, done) {

              Korisnik.findOne({
                  korisnickoIme: korisnickoIme
              }, function(err, korisnik) {


                  if (err) {
                      return done(err);
                  }
                  if (!korisnik) {
                      return done(null, false, {
                          message: 'Nepoznat korisnik.'
                      });
                  }
                  if (!korisnik.authenticate(lozinka)) {
                      return done(null, false, {
                          message: 'Neispravna lozinka.'
                      });
                  }
                  return done(null, korisnik);
              });
          }
        ));

        /*    // Use local strategy
            passport.use(new LocalStrategy({
                    usernameField: 'email',
                    passwordField: 'password'
                },
                function(email, password, done) {
                    User.findOne({
                        email: email
                    }, function(err, user) {
                        if (err) {
                            return done(err);
                        }
                        if (!user) {
                            return done(null, false, {
                                message: 'Unknown user'
                            });
                        }
                        if (!user.authenticate(password)) {
                            return done(null, false, {
                                message: 'Invalid password'
                            });
                        }
                        return done(null, user);
                    });
                }
            ));
        */

};
