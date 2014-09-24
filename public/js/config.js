'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider

    .state('korisnik narudzbe', {
        url: '/korisnik/:korisnikId/narudzbe',
        templateUrl: 'views/korisnik/narudzbe.html',

    })
    .state('konkretna kategorija', {
        url: '/kategorije/:kategorijaId',
        templateUrl: 'views/korisnik/kategorija.html',

    })
    .state('konkretan proizvod kategorije', {
        url: '/kategorije/:kategorijaId/proizvodi/:proizvodId',
        templateUrl: 'views/korisnik/proizvod.html',

    })
     .state('korpa', {
        url: '/korpa',
        templateUrl: 'views/korisnik/korpa.html'
    })
    .state('narucivanje', {
       url: '/narucivanje',
       templateUrl: 'views/korisnik/narucivanje.html'
   })
   .state('narucivanje zahvalnica', {
      url: '/narucivanje/zahvalnica',
      templateUrl: 'views/korisnik/hvala.html'
  })
    .state('admin korisnici', {
       url: '/admin/korisnici',
       templateUrl: 'views/admin/korisnici/adminKorisnici.html'
   })
   .state('admin pregled korisnika', {
      url: '/admin/korisnici/:korisnikId',
      templateUrl: 'views/admin/korisnici/adminPregledKorisnika.html'
  })
     .state('admin proizvodjaci', {
        url: '/admin/proizvodjaci',
        templateUrl: 'views/admin/proizvodjaci/adminProizvodjaci.html'
    })
     .state('admin dodavanje proizvodjaca', {
        url: '/admin/proizvodjaci/dodavanje',
        templateUrl: 'views/admin/proizvodjaci/adminDodavanjeProizvodjaca.html'
    })
      .state('admin izmena proizvodjaca', {
        url: '/admin/proizvodjaci/:proizvodjacId/izmena',
        templateUrl: 'views/admin/proizvodjaci/adminIzmenaProizvodjaca.html'
    })
     .state('admin pregled proizvodjaca', {
        url: '/admin/proizvodjaci/:proizvodjacId',
        templateUrl: 'views/admin/proizvodjaci/adminPregledProizvodjaca.html'
    })
     .state('admin proizvodi', {
        url: '/admin/proizvodi',
        templateUrl: 'views/admin/proizvodi/adminProizvodi.html'
    })
    .state('admin dodavanje proizvoda', {
        url: '/admin/proizvodi/dodavanje',
        templateUrl: 'views/admin/proizvodi/adminDodavanjeProizvoda.html'
    })
    .state('admin izmena proizvoda', {
        url: '/admin/proizvodi/:proizvodId/izmena',
        templateUrl: 'views/admin/proizvodi/adminIzmenaProizvoda.html'
    })
    .state('admin pregled proizvoda', {
       url: '/admin/proizvodi/:proizvodId',
       templateUrl: 'views/admin/proizvodi/adminPregledProizvoda.html'
   })
    .state('admin kategorije', {
        url: '/admin/kategorije',
        templateUrl: 'views/admin/kategorije/adminKategorije.html'
    })
    .state('admin dodavanje kategorije', {
        url: '/admin/kategorije/dodavanje',
        templateUrl: 'views/admin/kategorije/adminDodavanjeKategorije.html'
    })
     .state('admin izmena kategorije', {
        url: '/admin/kategorije/:kategorijaId/izmena',
        templateUrl: 'views/admin/kategorije/adminIzmenaKategorije.html'
    })
    .state('admin pregled kategorije', {
       url: '/admin/kategorije/:kategorijaId',
       templateUrl: 'views/admin/kategorije/adminPregledKategorije.html'
   })
     .state('admin admini', {
        url: '/admin/admini',
        templateUrl: 'views/admin/admini/adminAdmini.html'
    })
     .state('admin dodavanje admina', {
        url: '/admin/admini/dodavanje',
        templateUrl: 'views/admin/admini/adminDodavanjeAdmina.html'
    })
      .state('home', {
        url: '/',
        templateUrl: 'views/index.html',
        controller: 'IndexKorisnikCtrl'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
