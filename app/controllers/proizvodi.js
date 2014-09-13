'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Proizvod = mongoose.model('Proizvod'),
    _ = require('lodash');


/**
 * Find proizvod by id
 */
exports.proizvod = function(req, res, next, id) {
    Proizvod.load(id, function(err, proizvod) {
        if (err) return next(err);
        if (!proizvod) return next(new Error('Failed to load proizvod ' + id));
        req.proizvod = proizvod;
        next();
    });
};

/**
 * Create an proizvod
 */
exports.create = function(req, res) {
    var proizvod = new Proizvod(req.body);
  //  proizvod.proizvodjac = req.proizvodjac;
  //  proizvod.kategorija = req.kategorija;

    proizvod.save(function(err) {
        if (err) {
            return res.send('#!/admin/proizvodi', {
                errors: err.errors,
                proizvod: proizvod
            });
        } else {
            res.jsonp(proizvod);
        }
    });
};

/**
 * Update an proizvod
 */
exports.update = function(req, res) {
    var proizvod = req.proizvod;

    proizvod = _.extend(proizvod, req.body);

    proizvod.save(function(err) {
        if (err) {
            return res.send('admin/proizvod', {
                errors: err.errors,
                proizvod: proizvod
            });
        } else {
            res.jsonp(proizvod);
        }
    });
};

/**
 * Delete an proizvod
 */
exports.destroy = function(req, res) {
    var proizvod = req.proizvod;

    proizvod.remove(function(err) {
        if (err) {
            return res.send('admin/proizvod', {
                errors: err.errors,
                proizvod: proizvod
            });
        } else {
            res.jsonp(proizvod);
        }
    });
};

/**
 * Show an proizvod
 */
exports.show = function(req, res) {
    res.jsonp(req.proizvod);
};

/**
 * List of proizvod
 */
exports.all = function(req, res) {
    Proizvod.find().sort('naziv').populate('proizvodjac').populate('kategorija').exec(function(err, proizvodi) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(proizvodi);
        }
    });
};
