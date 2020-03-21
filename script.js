$(function() {

    var search = (function() {
        // method calls
        events();

        // cache DOM
        var btn = $(".search button");
        var input = $(".city-input");

        // events
        function events() {
            btn.click();
        }


    })();
    $.ajax({
        method: "GET",
        url: "https://corona.lmao.ninja/states",
        success: function(data) {
            
        }
    });
});