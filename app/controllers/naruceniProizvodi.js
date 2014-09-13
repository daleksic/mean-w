'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    NaruceniProizvod = mongoose.model('NaruceniProizvod'),
    _ = require('lodash');


/**
 * Find narudzba by id
 */
exports.naruceniProizvod = function(req, res, next, id) {
    NaruceniProizvod.load(id, function(err, naruceniProizvod) {
        if (err) return next(err);
        if (!naruceniProizvod) return next(new Error('Failed to load naruceniProizvod ' + id));
        req.naruceniProizvod = naruceniProizvod;
        next();
    });
};

/**
 * Create an naruceniProizvod
 */
exports.create = function(req, res) {
    var naruceniProizvod = new NaruceniProizvod(req.body);


    naruceniProizvod.save(function(err) {
        if (err) {
            return res.send('/', {
                errors: err.errors,
                naruceniProizvod: naruceniProizvod
            });
        } else {
            res.jsonp(naruceniProizvod);
        }
    });
};


/**
 * Show an proizvod
 */
exports.show = function(req, res) {
    res.jsonp(req.naruceniProizvod);
};

/**
 * List of narudzba
 */
exports.all = function(req, res) {
    NaruceniProizvod.find().sort('cenaProizvoda').populate('narudzba').populate('proizvod').exec(function(err, naruceniProizvod) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(naruceniProizvod);
        }
    });
};
