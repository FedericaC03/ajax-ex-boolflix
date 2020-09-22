$(document).ready(function(){


//CHIAMATA AJAX
var searchMovie = "spongebob"
$.ajax(
  {
    "url": "https://api.themoviedb.org/3/search/movie",
    "data": {
      "api_key": "639cb73214ae520200c0768191807286",
      "query": searchMovie, //creare la variabile che ti va a leggere il film
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

});


function renderMovie(movies) {
  //HANDLEBARS TEMPLATE
  var source = $("#template").html();
  var template = Handlebars.compile(source);

//STAMPO OGNI FILM RICEVUTO DALLA CHIAMATA AJAX
for (var i = 0; i < movies.length; i++) {
  console.log(movies[i]);

  var context = {
          "title" : movies[i].title,
          "original_title" : movies[i].original_title ,
          "language" : movies[i].original_language,
          "vote" : movies[i].vote_average,

        };
        var html = template(context);
        $("#movie-list").append(html);

}


}
