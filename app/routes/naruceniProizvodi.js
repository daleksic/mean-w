'use strict';

// NaruceniProizvodi routes use naruceniProizvodi controller
var naruceniProizvodi = require('../controllers/naruceniProizvodi');
var authorization = require('./middlewares/authorization');

// NaruceniProizvodi authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

/*    app.get('/korisnik/:korisnikId/narudzbe', naruceniProizvodi.all);
    app.post('/narucivanje', authorization.requiresLogin, naruceniProizvodi.create);
    app.get('/korisnik/:korisnikId/narudzbe/:narudzbaId', naruceniProizvodi.show);*/

    app.get('/naruceniProizvodi', naruceniProizvodi.all);
    app.post('/naruceniProizvodi', authorization.requiresLogin, naruceniProizvodi.create);
    app.get('/naruceniProizvodi/:naruceniProizvodId', naruceniProizvodi.show);


    // Finish with setting up the naruceniProizvodId param
    app.param('naruceniProizvodId', naruceniProizvodi.naruceniProizvod);

};
