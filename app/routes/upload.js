'use strict';

// User routes use users controller
var admins = require('../controllers/admins');
var busboy = require('connect-busboy');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();



module.exports = function(app, passport) {


   app.post('/upload', multipartMiddleware, function(req, res){


        var oldPath = req.files.myFile.path;
        var separator = '/';
        var filename =  req.files.myFile.originalFilename;

        var newPath ;
        var z = oldPath.substring(0, oldPath.lastIndexOf('\\')+1);

        newPath = z + filename;

        console.log('tip: ', req.body.tip);

        fs.renameSync(oldPath, newPath, function(err) {
                if(err) console.error(err.stack);
            });
  

   });



};
