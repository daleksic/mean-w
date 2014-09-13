'use strict';

// User routes use users controller
var korisnici = require('../controllers/korisnici');
var authorization = require('./middlewares/authorization');

var hasAuthorization = function(req, res, next) {
  if (!req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app, passport) {

    app.get('/prijava', korisnici.signin);
   app.get('/registracija', korisnici.signup);
    app.get('/odjava', korisnici.signout);
    app.get('/korisnici/me', korisnici.me);

     app.get('/admin/korisnici', korisnici.all);
    // Setting up the korisnici api
    app.post('/korisnici', korisnici.create);
    app.get('/admin/korisnici/:korisnikId', korisnici.show);
     app.del('/admin/korisnici/:korisnikId', authorization.requiresLogin , hasAuthorization, korisnici.destroy);


    // Setting up the adminId param
    app.param('korisnikId', korisnici.korisnik);

    // Setting the local strategy route
    app.post('/korisnik/session', passport.authenticate('korisnikLocal', {
        failureRedirect: '/prijava',
        failureFlash: true
    }), korisnici.session);


};
