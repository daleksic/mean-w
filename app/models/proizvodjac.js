'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Proizvodjac Schema
 */
var ProizvodjacSchema = new Schema({
    naziv: {
        type: String,
        required: true
    },
    adresa: {
        type: String,
        required: true
    }
});


/**
 * Statics
 */
ProizvodjacSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('proizvodjac').exec(cb);
};

mongoose.model('Proizvodjac', ProizvodjacSchema);
