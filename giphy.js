$(document).ready(function () {
    // 1) Before you can make any part of your site work, you need to create an array of strings, each one related to a topic that interests you. 
    //    Save it to a variable called topics. *I changed it to games. 
    var games = [
        "NES", "SNES", "N64", "GAMECUBE", "WII", "WIIU",
        "SWITCH", "GAMEBOY", "GBA", "NDS", "3DS"
    ];
    // 2) Your app should take the topics in this array and create buttons in your HTML
    populateButtons = (arrayToUse, classToAdd, areaToAddTo) => {
        $(areaToAddTo).empty();
        // Try using a loop that appends a button for each string in the array.
        // https://www.tutorialrepublic.com/faq/how-to-display-all-items-in-array-using-loop-in-jquery.php
        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }

    }
    // 3) When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
    $(document).on("click", ".game-button", function () {
        $("#games").empty();
        $(".game-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=mY2WDhMqEm7X2hGN8QMo6oSnq7E9009e&limit=10"; // added my api key
        //make https request 
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gameDiv = $("<div class=\"game-item\">");

                    var rating = results[i].rating;
                    //5) Under every gif, display its rating 
                    var p = $("<p>").text("Rating: " + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var gameImage = $("<img>");
                    gameImage.attr("src", still);
                    gameImage.attr("data-still", still);
                    gameImage.attr("data-animate", animated);
                    gameImage.attr("data-state", "still");
                    gameImage.addClass("game-image");

                    gameDiv.append(p);
                    gameDiv.append(gameImage);

                    $("#games").append(gameDiv);
                }
            });
    });
    //4) When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
    $(document).on("click", ".game-image", function () {

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
    // 6) Add a form to your page that takes a value from a user input box and adds it to your topics array. Then make a function call that takes each topic in the array and remakes the buttons on the page.



    $("#add-game").on("click", function (event) {
        event.preventDefault();
        var newgame = $("input").eq(0).val();

        if (newgame.length > 2) {
            games.push(newgame);
        }

        populateButtons(games, "game-button", "#game-buttons");

    });

    populateButtons(games, "game-button", "#game-buttons");
});
