'use strict';

// User routes use users controller
var admins = require('../controllers/admins');
var authorization = require('./middlewares/authorization');

var hasAuthorization = function(req, res, next) {
	if (!req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app, passport) {

    app.get('/prijavaAdmin', admins.signin);
   // app.get('/admin/registracija', admins.signup);
    app.get('/odjava', admins.signout);
    app.get('/admins/me', admins.me);

     app.get('/admins', admins.all);
    // Setting up the admins api
    app.post('/admins', authorization.requiresLogin, admins.create);
   /*  app.del('/admins/:adminId', authorization.requiresLogin , hasAuthorization, admins.destroy);*/


    // Setting up the adminId param
    app.param('adminId', admins.admin);

    // Setting the local strategy route
    app.post('/admin/session', passport.authenticate('adminLocal', {
        failureRedirect: '/prijavaAdmin',
        failureFlash: true
    }), admins.session);


};
