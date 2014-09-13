'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Admin Schema
 */
var AdminSchema = new Schema({
    korisnickoIme: {
        type: String,
         unique: true,
        required: true
    },
    lozinka: {
        type: String,
       required: true

    }
});

/**
 * Methods
 */
AdminSchema.methods = {
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

mongoose.model('Admin', AdminSchema);
