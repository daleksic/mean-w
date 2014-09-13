'use strict';

// Articles routes use articles controller
var proizvodi = require('../controllers/proizvodi');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (!req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/admin/proizvodi', proizvodi.all);
    app.post('/admin/proizvodi', authorization.requiresLogin, proizvodi.create);
    app.get('/admin/proizvodi/:proizvodId', proizvodi.show);
    app.put('/admin/proizvodi/:proizvodId', authorization.requiresLogin, hasAuthorization, proizvodi.update);
    app.del('/admin/proizvodi/:proizvodId', authorization.requiresLogin, hasAuthorization, proizvodi.destroy);

    // Finish with setting up the articleId param
    app.param('proizvodId', proizvodi.proizvod);

};
