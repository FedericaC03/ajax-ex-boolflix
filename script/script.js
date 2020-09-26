$(document).ready(function(){


  //METTO LA CHIAMATA AJAX ALL'INTERNO DI UNA FUNZIONE CHE RESTITUISCE LA LISTA DEI FILM
 function callAjaxMovies(value) {
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
          var risultatoFilm = data.results;
          renderMovie(risultatoFilm);
        },

        "error": function(errore) {
          alert("Errore");
        }
      }
    );
  }

  //METTO LA CHIAMATA AJAX ALL'INTERNO DI UNA FUNZIONE CHE RESTITUISCE LA LISTA DELLE SERIE TV
  function callAjaxSeries(value) {
     $.ajax(
       {
         "url": "https://api.themoviedb.org/3/search/tv",
         "data": {
           "api_key": "639cb73214ae520200c0768191807286",
           "query": value,
           "language": "it-IT"
         },
         "method": "GET",
         "success": function(data) {
           var risultatoSeries = data.results;
           renderSeries(risultatoSeries)
         },

         "error": function(errore) {
           alert("Errore");
         }
       }
     );
   }


  // PRENDO IL VALORE DALLA INPUT CLICCANDO SU CERCA
  $("#search-button").click(function() {
    var value = $("#search-bar").val();
    $("#search-bar").val(""); //svuoto la search bar dopo ogni invio
    callAjaxMovies(value);
    callAjaxSeries(value);
  });

  // PRENDO IL VALORE DALLA INPUT CLICCANDO SU INVIO
  $("#search-bar").keyup(
      function(event) {
        if (event.which == 13) {
          var value = $("#search-bar").val();
          $("#search-bar").val(""); //svuoto la search bar dopo ogni invio
          callAjaxMovies(value);
          callAjaxSeries(value);
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
          var star = '<i class="fas fa-star yellow"></i>';
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
    var flag = '<img class="flag" src="img/it.svg" alt="it">';
  } else if (flag == "en") {
    flag = '<img class="flag" src="img/gb.svg" alt="it">';
  } else if (flag == "fr") {
    flag = '<img class="flag" src="img/fr.svg" alt="it">';
  } else if (flag == "es") {
    flag = '<img class="flag" src="img/es.svg" alt="it">';
  } else if (flag == "de") {
    flag = '<img class="flag" src="img/de.svg" alt="it">';
  } else {
    flag;
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

//SE NON C'E' UN IMMAGINE DI COPERTINA PER IL FILM, VIENE GENERATA UN IMMAGINE VUOTA
if (movies[i].poster_path == null) {
  var poster = "img/notavailable.jpg";
} else {
  var poster = "https://image.tmdb.org/t/p/w342" + movies[i].poster_path;
}

  var context = {
          "title" : movies[i].title,
          "original_title" : movies[i].original_title ,
          "language" : flag,
          "vote" : movies[i].vote_average,//NUMERO
          "voto" : star, //STELLA
          "path" : poster ,
          "overview" : movies[i].overview,
        };
        var html = template(context);
        $("#movie-list").append(html);
  }
}

//FUNZIONE CHE MI RITORNA LA LISTA DELLE SERIE TV
function renderSeries(series) {
  //HANDLEBARS TEMPLATE
  var source = $("#template").html();
  var template = Handlebars.compile(source);

  //CANCELLA LA LISTA QUANDO SI EFFETTUA UNA NUOVA RICERCA
    $("#series-list").html("");
  //STAMPO OGNI FILM RICEVUTO DALLA CHIAMATA AJAX
  for (var i = 0; i < series.length; i++) {
  var star = getStars(series[i].vote_average);
  var flag = getFlag(series[i].original_language);

  //SE NON C'E' UN IMMAGINE DI COPERTINA PER lA SERIE, VIENE GENERATA UN IMMAGINE VUOTA
  if (series[i].poster_path == null) {
    var poster = "img/notavailable.jpg";
  } else {
    var poster = "https://image.tmdb.org/t/p/w342" + series[i].poster_path;
  }

    var context = {
            "title" : series[i].name,
            "original_title" : series[i].original_name ,
            "language" : flag,
            "vote" : series[i].vote_average,//NUMERO
            "voto" : star, //STELLA
            "path" : poster ,
            "overview" : series[i].overview,
          };
          var html = template(context);
          $("#series-list").append(html);
    }
}

});
