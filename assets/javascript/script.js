var topics = ["Basketball", "Soccer", "Football", "Cricket", "Skating", "Running"];
var favorites = [];

//Function to create buttons 
function renderButtons() {

  $("#buttons-view").empty();
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>").addClass("button");
    a.addClass("gif");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
}


//This function will display all the gifs when the button with gif description is clicked
function displayGifs() {

  var gifCategory = $(this).attr("data-name");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gifCategory + "&api_key=dc6zaTOxFJmzC&limit=10";


  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var results = response.data;
    for (var i = 0; i < results.length; i++) {

      var gifDiv = $("<div>").addClass("gallery-item");
      var p = $("<p>");
      var imageidname = "gif-image" + i;
      p.text("Rating : " + results[i].rating);
      var gifImage = $("<img>").addClass("gif-image img-thumbnail");
      gifImage.attr("id", imageidname);
      gifImage.attr("src", results[i].images.fixed_width_still.url);
      gifImage.attr("data-state", "still");
      gifImage.attr("data-still", results[i].images.fixed_width_still.url);
      gifImage.attr("data-animate", results[i].images.fixed_width.url);
      gifDiv.append(p);
      gifDiv.prepend(gifImage);
      $("#GIF-view").prepend(gifDiv); 
    }
    $("#GIF-view").prepend("<h2>" + gifCategory + "</h2>");
  });

}

// This function handles events where the add Gif button is clicked
$("#add-Gif").on("click", function (event) {
  event.preventDefault();
  var topic = $("#Search-input").val().trim();
  if (topic == "") {
    return false;
  }

  topics.push(topic);
  renderButtons();
  $("#Search-input").val('');

});

// This function makes the images still or animate when clicked on them
function StartStopGif() {

  var state = $(this).attr("data-state");

  if (state == "still") {
    var source = $(this).attr("data-animate");
    //$(imageid).attr("src",source);
    $(this).attr("src", source);
    console.log(source);
    // $(imageid).attr("data-state","animate");
    $(this).attr("data-state", "animate");
  }

  if (state == "animate") {
    var source = $(this).attr("data-still");
    $(this).attr("src", source);
    console.log(source);
    $(this).attr("data-state", "still");
  }
}

//On page load create the buttons from the intial array saved
renderButtons();


//when the button is clicked  display the gifs from api
$(document).on("click", ".gif", displayGifs);

//When the gif is clicked if it is animated state then stop or else if it is in a still state animate
$(document).on("click", ".gif-image", StartStopGif);