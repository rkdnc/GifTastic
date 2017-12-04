//Create a predetermined array of LOTR characters
var fellowship = ["Legolas", "Frodo", "Samwise", "Gandalf", "Aragorn", "Pippin", "Merry", "Bilbo", "Thorin"];
var queryURL = "https://api.giphy.com/v1/gifs/search";
console.log(fellowship);
// jQuery will use this array to create buttons in the sidebar div
// for (var i = 0; i < fellowship.length; i++){
//     $("#sidebar").append(`<div class='character'>${fellowship[i]}</div>`).attr("data-ArrayId", fellowship[i])
// };
// $("#sidebar").append("<form><input type='text' id='search'></input></form>");
var searchquery = "";
buttonMaker();
$(".btn").on("click", function () {
    searchquery = $("#search").val().trim();
    fellowship.push(searchquery);
    $("#buttonContainer").append(`<div class='character' data-name='${searchquery}'>${searchquery}</div>`);
    // $("#gifGrid").empty();
    //Clicking the button will ping the API for the corresponding gif

    $(".character").on("click", function () {
        searchquery = $(this).attr("data-name")
        $.ajax({
            url: queryURL,
            method: 'GET',
            data: {
                q: searchquery,
                api_key: "PRXRLwkU6WpQsDBHkPFR97yxG5o7gRNM",
                limit: 10,
            }
        }).done(function (response) {
            console.log(response);
            var results = resonse.data;
            for (var i = 0, len = results.length; i < len; i++){
                var gifDiv = $("<div>").addClass("item");
                var rating = results[i].rating;
                var pRating = $("<p>").text("Rating: " + rating);
                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height.url);
                gifDiv.append(pRating);
                gifDiv.append(personImage);
                $("#gifs-appear-here").prepend(gifDiv);
                
            }
            });
        });
        console.log(searchquery);
    })

$(".character").on("click", function () {
    searchquery = $(this).attr("data-name")
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {
        console.log(response);
    });
})
//This generates the buttons based on the fellowship array
function buttonMaker() { //I tried making this a foreach() but it just broke my code.
    // $("#buttonContainer").empty()
    for (var i = 0; i < fellowship.length; i++)
        $("#buttonContainer").append(`<div class='character' data-name='${fellowship[i]}'>${fellowship[i]}</div>`);
};


//When a button is pressed, the API will load nine gifs in the gif grid.

//These gifs should have a static image, that will change to the animated gif on the click.