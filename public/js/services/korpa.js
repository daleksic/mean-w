'use strict';

//Korpa service
angular.module('mean.korisnik', ['ngCookies']).factory('Korpa', ['$cookieStore', function($cookieStore) {

    var korpa = {

       proizvodiCookie: '',
       init: function(proizvodiCookie){
          this.proizvodiCookie = proizvodiCookie;
          if(!($cookieStore.get(this.proizvodiCookie) instanceof Array)){

              $cookieStore.put(this.proizvodiCookie, []);
        }
       },
       dodajProizvod: function(proizvod, kolicina){

            var proizvodi = $cookieStore.get(this.proizvodiCookie);
            var proizvodPostoji = false;
            var indeks = 0;
            for(var i=0; i< proizvodi.length; i++){

              if(proizvodi[i].id == proizvod._id){

                proizvodPostoji = true;
                var indeks = i;
              }


            }

            if(proizvodPostoji == false){

              var  proizvod  = {
                  id: proizvod._id,
                  naziv: proizvod.naziv,
                  jedinicnaCena: proizvod.cena,
                  kolicina: kolicina,
                  cena: kolicina * proizvod.cena
              };
              proizvodi.push(proizvod);
              $cookieStore.put(this.proizvodiCookie, proizvodi);

            }else{

               proizvodi[indeks].kolicina += kolicina;
               proizvodi[indeks].cena =   proizvodi[indeks].jedinicnaCena * proizvodi[indeks].kolicina;
               $cookieStore.put(this.proizvodiCookie, proizvodi);

            }

        },
        ukloniProizvod: function(indeks){
                var proizvodi = $cookieStore.get(this.proizvodiCookie);
                proizvodi.splice(indeks,1);
                $cookieStore.put(this.proizvodiCookie, proizvodi);
        },
        ukloniSve: function(){
                var proizvodi = $cookieStore.get(this.proizvodiCookie);
                proizvodi = [];
                $cookieStore.put(this.proizvodiCookie, proizvodi);

        },
        promeniKolicinu: function(indeks, kolicina){

                var proizvodi = $cookieStore.get(this.proizvodiCookie);
                proizvodi[indeks].kolicina = kolicina;
                proizvodi[indeks].cena =   proizvodi[indeks].jedinicnaCena * kolicina;
                $cookieStore.put(this.proizvodiCookie, proizvodi);

        },
        ukupnaCena: function(){

                var ukupnaCena = 0, proizvodi = $cookieStore.get(this.proizvodiCookie);
                for(var i=0; i<   proizvodi.length; i++){

                  ukupnaCena +=   proizvodi[i].cena;

                }
                return ukupnaCena;

        },
        getProizvodi: function(){

            return  $cookieStore.get(this.proizvodiCookie);
        }

    };

    return korpa;


}]);
