$(function() {

    // search module
    var search = (function() {
        // method calls

        // cache DOM
        var btn = $(".search button");
        var input = $(".state-input");
        var searchComponent = $(".search");
        var results = $(".results");
        var searchResults = $(".search_results");

        // events
        btn.click(displayData);

        // hide the home page and display data
        function displayData() {
            $.ajax({
                method: "GET",
                url: "https://corona.lmao.ninja/states",
                success: function(data) {
                    searchComponent.hide();
                    results.show();
    
                    $.each(data, function(i, val) {
                        if (input.val() === data[i].state) {
                            searchResults.text(data[i].state);
                        }
                    });
                }
            });
        }
    })();
});