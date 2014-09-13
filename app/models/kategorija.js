'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Kategorija Schema
 */
var KategorijaSchema = new Schema({
    naziv: {
        type: String,
        required: true
    },
    velikaSlika: {
        type: String,
          required: true
    },
    malaSlika: {
        type: String,
          required: true
    }
});


/**
 * Statics
 */
KategorijaSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('proizvodjac').exec(cb);
};

mongoose.model('Kategorija', KategorijaSchema);
