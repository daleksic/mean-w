'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * NaruceniProizvod Schema
 */
var NaruceniProizvodSchema = new Schema({
  cenaProizvoda: {
      type: Number,
      required: true
  },
    kolicina: {
        type: Number,
        required: true
    },
    narudzba: {
        type: Schema.ObjectId,
        ref: 'Narudzba'
    },
     proizvod: {
        type: Schema.ObjectId,
        ref: 'Proizvod'
    }
});


/**
 * Statics
 */
NaruceniProizvodSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('narudzba').populate('proizvod').exec(cb);
};

mongoose.model('NaruceniProizvod', NaruceniProizvodSchema);
