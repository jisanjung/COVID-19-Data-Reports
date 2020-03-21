$(function() {
    // search module
    var search = (function() {
        // cache DOM
        var btn = $(".search button");

        // events
        btn.click(displayData);

        // hide the home page and display data
        function displayData() {
            $.ajax({
                method: "GET",
                url: "https://corona.lmao.ninja/states",
                success: function(data) {
                    results.showData(data);
                }
            });
        }
    })();

    // results module
    var results = (function() {
        // cache DOM
        var input = $(".state-input");
        var hideWhenClicked = $(".hide_clicked");
        var results = $(".results");
        var searchResults = $(".search_results");
        var totalCases = $("#totalCases");
        var casesToday = $("#casesToday");
        var totalDeaths = $("#totalDeaths");
        var deathsToday = $("#deathsToday");
        var recovered = $("#recovered");

        // display results
        function showData(data) {
            hideWhenClicked.hide();
            results.show();
            var value = toTitleCase(input.val()); // "new york" -> "New York"

            $.each(data, function(i, val) {
                if (value === data[i].state) {
                    render({
                        state: data[i].state,
                        cases: data[i].cases,
                        todayCases: data[i].todayCases,
                        deaths: data[i].deaths,
                        todayDeaths: data[i].todayDeaths,
                        recovered: data[i].recovered
                    });
                }
            });
        }

        // render html
        function render(obj) {
            searchResults.text(obj.state);
            totalCases.text(obj.cases);
            casesToday.text(obj.todayCases);
            totalDeaths.text(obj.deaths);
            deathsToday.text(obj.todayDeaths);
            recovered.text(obj.recovered);
        }

        return {
            showData: showData
        };
    })();
});

// global functions
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}