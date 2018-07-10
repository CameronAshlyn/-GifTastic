// Api Key: W2QCIyR2FxLhIFzqSaec9SY7QCZlPRLR

/creates a button
function addButton(text) {
    var button = $("<button>");
    button.html(text);
    return button;
};



//creates image
function createImage(url, still, animated) {
    var image = $("<img>");
    image.attr({
        src: url,
        "data-animated": animated,
        "data-still": still,
        "data-state": "still"

    });
    return image;
}



//displays Giphy 
function displayGiphy(response) {
    $(".giphy__images").empty();
    var data = response.data;

    for (var i = 0; i < data.length; i++) {

        var animated = data[i].images.fixed_height.url;
        var still = data[i].images.fixed_height_still.url;
        var url = still;

        $(".giphy__images").prepend(createImage(url, still, animated));
    }


}


//gets the Giphy
function grabGiphy(val) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=" + val + "&api_key=W2QCIyR2FxLhIFzqSaec9SY7QCZlPRLR&limit=10",
        method: "GET"
    })
        .done(function (data) {
            console.log("Data: ", data);
            displayGiphy(data);
        })
        .fail(function (error) {
            console.log("error: ", error);
        });

};

function searchGiphy(event) {
    event.preventDefault();

    //get value of button
    var value = $("#search").val();
    $(".giphy__buttons").append(addButton(value));
    grabGiphy(value);
    $("#search").val("");

};


function searchGiphyByButton() {
    var name = $(this).html();
    grabGiphy(name);

};


// Main Features
// listening to the document for the onclick event because of the dynamically generated buttons
$(".giphy__search").on("click", searchGiphy);
$(document).on("click", ".giphy__buttons button", searchGiphyByButton);

function playGiphy() {

    var still = $(this).attr("data-still");
    var animated = $(this).attr("data-animated");
    var state = $(this).attr("data-state");

    if (state === "still") {
        //play image
        $(this).attr({
            "data-state": "play",
            src: animated
        });
    } else {
        //pause image
        $(this).attr({
            "data-state": "still",
            src: still
        })

    }

};

$(document).on("click", "img", playGiphy);


