'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Narudzba = mongoose.model('Narudzba'),
    _ = require('lodash');


/**
 * Find narudzba by id
 */
exports.narudzba = function(req, res, next, id) {
    Narudzba.load(id, function(err, narudzba) {
        if (err) return next(err);
        if (!narudzba) return next(new Error('Failed to load narudzba ' + id));
        req.narudzba = narudzba;
        next();
    });
};

/**
 * Create an proizvod
 */
exports.create = function(req, res) {
    var narudzba = new Narudzba(req.body);


    narudzba.save(function(err) {
        if (err) {
            return res.send('/', {
                errors: err.errors,
                narudzba: narudzba
            });
        } else {
            res.jsonp(narudzba);
        }
    });
};


/**
 * Show an proizvod
 */
exports.show = function(req, res) {
    res.jsonp(req.narudzba);
};

/**
 * List of narudzba
 */
exports.all = function(req, res) {
    Narudzba.find().sort('datum').populate('korisnik').exec(function(err, narudzbe) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(narudzbe);
        }
    });
};
