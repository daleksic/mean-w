'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Korisnik Schema
 */
var KorisnikSchema = new Schema({
  ime: {
      type: String,
      required: true
  },
  prezime: {
      type: String,
     required: true

  },
    korisnickoIme: {
        type: String,
         unique: true,
        required: true
    },
    lozinka: {
        type: String,
       required: true

    },
    adresa: {
        type: String,
        required: true
    }
});

/**
 * Methods
 */
KorisnikSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return plainText === this.lozinka;
    },


};

mongoose.model('Korisnik', KorisnikSchema);
