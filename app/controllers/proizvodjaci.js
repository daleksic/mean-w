'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Proizvodjac = mongoose.model('Proizvodjac'),
    _ = require('lodash');


/**
 * Find proizvodjac by id
 */
exports.proizvodjac = function(req, res, next, id) {
    Proizvodjac.load(id, function(err, proizvodjac) {
        if (err) return next(err);
        if (!proizvodjac) return next(new Error('Failed to load proizvodjac ' + id));
        req.proizvodjac = proizvodjac;
        next();
    });
};

/**
 * Create an proizvodjac
 */
exports.create = function(req, res) {
    var proizvodjac = new Proizvodjac(req.body);
   

    proizvodjac.save(function(err) {
        if (err) {
            return res.send('/admin/proizvodjaci', {
                errors: err.errors,
                proizvodjac: proizvodjac
            });
        } else {
            res.jsonp(proizvodjac);
        }
    });
};

/**
 * Update an proizvodjac
 */
exports.update = function(req, res) {
    var proizvodjac = req.proizvodjac;

    proizvodjac = _.extend(proizvodjac, req.body);

    proizvodjac.save(function(err) {
        if (err) {
            return res.send('/admin/proizvodjaci', {
                errors: err.errors,
                proizvodjac: proizvodjac
            });
        } else {
            res.jsonp(proizvodjac);
        }
    });
};

/**
 * Delete an proizvodjac
 */
exports.destroy = function(req, res) {
    var proizvodjac = req.proizvodjac;

    proizvodjac.remove(function(err) {
        if (err) {
            return res.send('/admin/proizvodjaci', {
                errors: err.errors,
                proizvodjac: proizvodjac
            });
        } else {
            res.jsonp(proizvodjac);
        }
    });
};

/**
 * Show an proizvodjac
 */
exports.show = function(req, res) {
    res.jsonp(req.proizvodjac);
};

/**
 * List of proizvodjac
 */
exports.all = function(req, res) {
    Proizvodjac.find().sort('-naziv').exec(function(err, proizvodjaci) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(proizvodjaci);
        }
    });
};
