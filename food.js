$(document).ready(function() {

    var food = [
      
     "pizza", "salad", "rolls",
      "cake",  "eggs", "cheese", "bread",
     "tacos", "french fries",
      "pasta", "smoothies",
      "chicken", "fish",
      
    ];
  
    // function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
  
      for (var i = 0; i < arrayToUse.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
      }
  
    }
  
    $(document).on("click", ".food-button", function() {
      $("#foods").empty();
      $(".food-button").removeClass("active");
      $(this).addClass("active");
  
      var type = $(this).attr("data-type");      
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=" + apiKey+"C8aX5zuF2OaYrn0UnQf80K0fFPbiBqEQ";
      

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            var foodDiv = $("<div class=\"food-item\">");
  
            var rating = results[i].rating;
  
            var p = $("<p>").text("Rating: " + rating);
  
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
  
            var foodImage = $("<img>");
            foodImage.attr("src", still);
            foodImage.attr("data-still", still);
            foodImage.attr("data-animate", animated);
            foodImage.attr("data-state", "still");
            foodImage.addClass("food-image");
  
            foodDiv.append(p);
            foodlDiv.append(foodImage);
  
            $("#foods").append(foodlDiv);
          }
        });
    });
  
    $(document).on("click", ".food-image", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#add-food").on("click", function(event) {
      event.preventDefault();
      var newFood = $("input").eq(0).val();
  
      if (newFood.length > 2) {
        foods.push(newFood);
      }
  
      populateButtons(food, "food-button", "#food-buttons");
  
    });
  
    populateButtons(food, "food-button", "#food-buttons");
  });
  