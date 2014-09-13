'use strict';

// Articles routes use articles controller
var proizvodjaci = require('../controllers/proizvodjaci');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (!req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

 module.exports = function(app) {

    app.get('/admin/proizvodjaci', proizvodjaci.all);
    app.post('/admin/proizvodjaci', authorization.requiresLogin, proizvodjaci.create);
    app.get('/admin/proizvodjaci/:proizvodjacId', proizvodjaci.show);
    app.put('/admin/proizvodjaci/:proizvodjacId', authorization.requiresLogin, hasAuthorization, proizvodjaci.update);
    app.del('/admin/proizvodjaci/:proizvodjacId', authorization.requiresLogin, hasAuthorization, proizvodjaci.destroy);

    // Finish with setting up the articleId param
    app.param('proizvodjacId', proizvodjaci.proizvodjac);

}; 
