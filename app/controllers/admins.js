'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Admin = mongoose.model('Admin');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/prijavaAdmin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
/*exports.signup = function(req, res) {
    res.render('/#!/admin/registracija', {
       // title: 'Sign up',
        user: new Admin()
    });
};*/

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/#!');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/#!/admin/kategorije');
};

/**
 * Create admin
 */
exports.create = function(req, res, next) {
    var admin = new Admin(req.body);
    var message = null;


     admin.save(function(err) {
        if (err) {
            return res.send('/', {
                errors: err.errors,
                admin: admin
            });
        } else {
            res.jsonp(admin);
            // res.redirect('/#!/admin/admini');
        }
    });

    /**
 * Delete an admin
 */
exports.destroy = function(req, res) {
    var admin = req.admin;

    admin.remove(function(err) {
        if (err) {
            return res.send('/', {
                errors: err.errors,
                admin: admin
            });
        } else {
            res.jsonp(admin);
        }
    });
};


 /*   admin.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }

            return res.redirect('/#!/admin/registracija') {
                message: message,
                admin: admin
            });
        }
        req.logIn(admin, function(err) {
            if (err) return next(err);
            return res.redirect('/#!/admin/kategorije');
        });
    });*/
};

/**
 * Send Admin
 */
exports.me = function(req, res) {
    res.jsonp(req.admin || null);
};

/**
 * Find admin by id
 */
exports.admin = function(req, res, next, id) {
    Admin
        .findOne({
            _id: id
        })
        .exec(function(err, admin) {
            if (err) return next(err);
            if (!admin) return next(new Error('Failed to load Admin ' + id));
            req.profile = admin;
            next();
        });
};

/**
 * List of admins
 */
exports.all = function(req, res) {
    Admin.find().sort('korisnickoIme').exec(function(err, admini) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(admini);
        }
    });
};
