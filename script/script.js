$(document).ready(function(){

 function callAjaxMovies(value) {
    //METTO LA CHIAMATA AJAX ALL'INTERNO DI UNA FUNZIONE
    $.ajax(
      {
        "url": "https://api.themoviedb.org/3/search/movie",
        "data": {
          "api_key": "639cb73214ae520200c0768191807286",
          "query": value,
          "language": "it-IT"
        },
        "method": "GET",
        "success": function(data) {
          var risultato = data.results;
          renderMovie(risultato);
        },

        "error": function(errore) {
          alert("Errore");
        }
      }
    );
  }

  // function callAjaxSeries(value) {
  //    //METTO LA CHIAMATA AJAX ALL'INTERNO DI UNA FUNZIONE
  //    $.ajax(
  //      {
  //        "url": "https://api.themoviedb.org/3/search/tv",
  //        "data": {
  //          "api_key": "639cb73214ae520200c0768191807286",
  //          "query": value,
  //          "language": "it-IT"
  //        },
  //        "method": "GET",
  //        "success": function(data) {
  //          var risultatoSeries = data.results;
  //          console.log(risultatoSeries);
  //        },
  //
  //        "error": function(errore) {
  //          alert("Errore");
  //        }
  //      }
  //    );
  //  }


  // PRENDO IL VALORE DALLA INPUT CLICCANDO SU CERCA
  $("#search-button").click(function() {
    var value = $("#search-bar").val();
    $("#search-bar").val(""); //svuoto la search bar dopo ogni invio
    callAjaxMovies(value);
    // callAjaxSeries(value);
  });

  // PRENDO IL VALORE DALLA INPUT CLICCANDO INVIO
  $("#search-bar").keyup(
      function(event) {
        if (event.which == 13) {
          var value = $("#search-bar").val();
          $("#search-bar").val(""); //svuoto la search bar dopo ogni invio
          callAjaxMovies(value);
          // callAjaxSeries(value);
        }
      }
    );

//CREO UNA FUNZIONE PER LE STELLINE
function getStars(vote) {

  //TRASFORMO IL VOTO DA 1 A 10 IN UN NUMERO INTERO DA 1 A 5
    var vote = Math.floor(vote / 2);

  //GENERO LE STELLE IN BASE AL VOTO
    var stars='';
        for(var i = 1; i <= 5; i++){
         if(i <= vote){
          var star = '<i class="fas fa-star"></i>';
         }else{
           var star = '<i class="far fa-star"></i>';
         }
        stars += star;
      };
      return stars;
}

//FUNZIONE CHE MI RITORNA L'IMMAGINE DELLA BANDIERA IN BASE ALLA LINGUA
function getFlag(flag) {

  if (flag == "it") {
    var flag = '<img src="img/it.svg" alt="it">';
  } else if (flag == "en") {
    flag = '<img src="img/gb.svg" alt="it">';
  } else if (flag == "fr") {
    flag = '<img src="img/fr.svg" alt="it">';
  } else if (flag == "es") {
    flag = '<img src="img/es.svg" alt="it">';
  } else if (flag == "de") {
    flag = '<img src="img/de.svg" alt="it">';
  } else {
    flag = flag;
  }
  return flag;
};

//FUNZIONE CHE MI RITORNA LA LISTA DEI FILM
function renderMovie(movies) {
  //HANDLEBARS TEMPLATE
  var source = $("#template").html();
  var template = Handlebars.compile(source);

//CANCELLA LA LISTA QUANDO SI EFFETTUA UNA NUOVA RICERCA
  $("#movie-list").html("");
//STAMPO OGNI FILM RICEVUTO DALLA CHIAMATA AJAX
for (var i = 0; i < movies.length; i++) {
var star = getStars(movies[i].vote_average);
var flag = getFlag(movies[i].original_language);

  var context = {
          "title" : movies[i].title,
          "original_title" : movies[i].original_title ,
          "language" : flag,
          "vote" : movies[i].vote_average,//NUMERO
          "voto" : star, //STELLA
          "release_date" : movies[i].release_date,
        };
        var html = template(context);
        $("#movie-list").append(html);
  }
}




});
