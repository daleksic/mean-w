'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Proizvod Schema
 */
var ProizvodSchema = new Schema({
    naziv: {
        type: String,
        required: true
    },
    opis: {
        type: String,
        default: '',
        required: true
    },
    cena: {
        type: Number,
        required: true
    },
    velikaSlika: {
        type: String,
          required: true
    },
    malaSlika: {
        type: String,
          required: true
    },
     proizvodjac: {
        type: Schema.ObjectId,
        ref: 'Proizvodjac'
    },
    kategorija: {
        type: Schema.ObjectId,
        ref: 'Kategorija'
    }
});


/**
 * Statics
 */
ProizvodSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('proizvodjac').populate('kategorija').exec(cb);
};

mongoose.model('Proizvod', ProizvodSchema);
