'use strict';

// Narudzbe routes use narudzbe controller
var narudzbe = require('../controllers/narudzbe');
var authorization = require('./middlewares/authorization');

// Narudzba authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {


    app.get('/narudzbe', narudzbe.all);
    app.post('/narudzbe', authorization.requiresLogin, narudzbe.create);
    app.get('/narudzbe/:narudzbaId', narudzbe.show);


    // Finish with setting up the narudzbaId param
    app.param('narudzbaId', narudzbe.narudzba);

};
