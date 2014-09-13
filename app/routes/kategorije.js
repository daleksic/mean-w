'use strict';

// Articles routes use articles controller
var kategorije = require('../controllers/kategorije');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (!req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/admin/kategorije', kategorije.all);
    app.get('/', kategorije.all);
    app.post('/admin/kategorije', authorization.requiresLogin, kategorije.create);
    app.get('/admin/kategorije/:kategorijaId', kategorije.show);
    app.put('/admin/kategorije/:kategorijaId', authorization.requiresLogin, hasAuthorization, kategorije.update);
    app.del('/admin/kategorije/:kategorijaId', authorization.requiresLogin, hasAuthorization, kategorije.destroy);

    // Finish with setting up the articleId param
    app.param('kategorijaId', kategorije.kategorija);

};
