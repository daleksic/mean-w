'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Narudzba Schema
 */
var NarudzbaSchema = new Schema({
    adresa: {
        type: String,
        default: '',
        required: true
    },
    nacinPlacanja: {
        type: String,
        required: true
    },
    ukupnaCena: {
        type: Number,
        required: true
    },
    datum: {
        type: Date,
          required: true
    },
     korisnik: {
        type: Schema.ObjectId,
        ref: 'Korisnik'
    }
});


/**
 * Statics
 */
NarudzbaSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('korisnik').exec(cb);
};

mongoose.model('Narudzba', NarudzbaSchema);
