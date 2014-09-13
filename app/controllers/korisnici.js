'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Korisnik = mongoose.model('Korisnik');

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
    res.render('users/prijava', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/registracija', {
        title: 'Sign up',
        korisnik: new Korisnik()
    });
};

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
    res.redirect('/#!');
};

/**
 * Show an korisnik
 */
exports.show = function(req, res) {
    res.jsonp(req.korisnik);
};


/**
 * Create korisnik
 */
exports.create = function(req, res, next) {
    var korisnik = new Korisnik(req.body);
    var message = null;


    korisnik.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Korisničko ime već postoji.';
                    break;
                default:
                    message = 'Molimo Vas da popunite sva polja.';
            }

            return res.render('users/registracija', {
                message: message,
                korisnik: korisnik
            });
        }

        req.login(korisnik, function(err) {
            if (err) { return next(err);}
            return res.redirect('/#!');
        });
    });
};

/**
* Delete korisnik
*/
exports.destroy = function(req, res) {
var korisnik = req.korisnik;
console.log(korisnik);
korisnik.remove(function(err) {
    if (err) {
        return res.send('/', {
            errors: err.errors,
            korisnik: korisnik
        });
    } else {
        res.jsonp(korisnik);
    }
});
};

/**
 * Send Korisnik
 */
exports.me = function(req, res) {
    res.jsonp(req.korisnik || null);
};

/**
 * Find korisnik by id
 */
exports.korisnik = function(req, res, next, id) {
    Korisnik
        .findOne({
            _id: id
        })
        .exec(function(err, korisnik) {
            if (err) return next(err);
            if (!korisnik) return next(new Error('Failed to load User ' + id));
            req.korisnik = korisnik;
            req.profile = korisnik;
            next();
        });
};

/**
 * List of korisnik
 */
exports.all = function(req, res) {
    Korisnik.find().sort('korisnickoIme').exec(function(err, korisnici) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(korisnici);
        }
    });
};
