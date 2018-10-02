$(function()){
    var populateButtons(searchArray, 'searchButton', '#buttonArea');
    console.log('Page Loaded');
})

var searchArray = ['Devils Triangle', 'Boof', 'Ralph'];

function populateButtons(searchArray, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();
    for(i=0;i<searchArray.lenghth; i++){
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
}

$(document).on('click', '.searchButton', function() {
    var type = (this).data('type');
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' +type+ '&api_key=dc6azTOxFJmzC';
    $.ajax({url: queryURL, method: 'GET'})
    .done(function(responce){
        for(i=0; i<responce.data.lenghth; i++)
        var searchDiv = $('<div class= "search-item">');
        var rating = responce.data[i].rating;
        var p= $('<p>').text('Rating: '+ rating);
        var animated =  responce.data[i].images.fixed_height.url;
        var still = responce.data[i].images.fixed_height_still.url;
        var image = $('<img>');
        image.attr('src', still);
        image.attr('data-still', still);
        image.attr('data-animated', animated);
        image.attr('data-state', 'still');
        image.addClass('searchImage');
        searchDiv.append(p);
        searchDiv.append(image);
        $('#searches').append(searchDiv);
    })
})

$(document).on('click', .searchImage, function(){
    var state = $(this).data('data-state');
    if (state == 'still'){
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

})

$('#addSearch').on('click', function(){
    var newSearch = $('input').eq(0).val();
    searchArray.push(newSearch);
    populateButtons(searchArray, 'searchButton', 'buttonArea');
    return false;
})
