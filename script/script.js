
function renderMovie(movies) {
  //HANDLEBARS TEMPLATE
  var source = $("#template").html();
  var template = Handlebars.compile(source);

//CANCELLA LA LISTA QUANDO SI EFFETTUA UNA NUOVA RICERCA
  $("#movie-list").html("");
//STAMPO OGNI FILM RICEVUTO DALLA CHIAMATA AJAX
for (var i = 0; i < movies.length; i++) {

  var context = {
          "title" : movies[i].title,
          "original_title" : movies[i].original_title ,
          "language" : movies[i].original_language,
          "vote" : movies[i].vote_average,
          "release_date" : movies[i].release_date,
        };
        var html = template(context);
        $("#movie-list").append(html);
  }
}


$(document).ready(function(){

 function callAjax(value) {
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
  // PRENDO IL VALORE DALLA INPUT CLICCANDO SU CERCA
  $("#search-button").click(function() {
    var value = $("#search-bar").val();
    $("#search-bar").val(""); //svuoto la search bar dopo ogni invio
    callAjax(value);
  });

  // PRENDO IL VALORE DALLA INPUT CLICCANDO INVIO
  $("#search-bar").keyup(
      function(event) {
        if (event.which == 13) {
          var value = $("#search-bar").val();
          $("#search-bar").val(""); //svuoto la search bar dopo ogni invio
          callAjax(value);
        }
      }
    );

});
