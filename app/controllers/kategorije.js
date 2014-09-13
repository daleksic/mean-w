'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Kategorija = mongoose.model('Kategorija'),
    _ = require('lodash');


/**
 * Find kategorija by id
 */
exports.kategorija = function(req, res, next, id) {
    Kategorija.load(id, function(err, kategorija) {
        if (err) return next(err);
        if (!kategorija) return next(new Error('Nije moguce ucitati kategoriju ' + id));
        req.kategorija = kategorija;
        next();
    });
};

/**
 * Create an kategorija
 */
exports.create = function(req, res) {
    var kategorija = new Kategorija(req.body);

    kategorija.save(function(err) {
        if (err) {
            return res.send('admin/kategorija', {
                errors: err.errors,
                kategorija: kategorija
            });
        } else {
            res.jsonp(kategorija);
        }
    });
};

/**
 * Update an kategorija
 */
exports.update = function(req, res) {
    var kategorija = req.kategorija;

    kategorija = _.extend(kategorija, req.body);

    kategorija.save(function(err) {
        if (err) {
            return res.send('admin/kategorije', {
                errors: err.errors,
                kategorija: kategorija
            });
        } else {
            res.jsonp(kategorija);
        }
    });
};

/**
 * Delete an kategorija
 */
exports.destroy = function(req, res) {
    var kategorija = req.kategorija;

    kategorija.remove(function(err) {
        if (err) {
            return res.send('admin/kategorije', {
                errors: err.errors,
                kategorija: kategorija
            });
        } else {
            res.jsonp(kategorija);
        }
    });
};

/**
 * Show an kategorija
 */
exports.show = function(req, res) {
    res.jsonp(req.kategorija);
};

/**
 * List of kategorija
 */
exports.all = function(req, res) {
    Kategorija.find().sort('naziv').exec(function(err, kategorije) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(kategorije);
        }
    });
};
