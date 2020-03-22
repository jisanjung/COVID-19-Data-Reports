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
        var percentBar = $(".percent_bar");
        var USCases = $("#USCases");

        // display results
        function showData(data) {
            hideWhenClicked.hide();
            results.show();
            var value = toTitleCase(input.val()); // "new york" -> "New York"
            var totalSum = 0;

            $.each(data, function(i, val) {
                totalSum += data[i].cases;
                if (value === data[i].state) {
                    render({
                        state: data[i].state,
                        cases: data[i].cases,
                        todayCases: data[i].todayCases,
                        deaths: data[i].deaths,
                        todayDeaths: data[i].todayDeaths,
                        recovered: data[i].recovered
                    });
                    displayError.hideError();
                }
            });
            renderBar(totalSum);
            displayError.check(casesToday, hideWhenClicked, results);
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

        // calculate percentage
        function percentage(cases, total) {
            var percent = cases / total;
            return 100 - Math.ceil(percent * 100);
        }

        // display percentage bar 
        function renderBar(sum) {
            percentBar.css({
                right: "" + percentage(parseInt(totalCases.text()), Math.ceil(sum)) + "%"
            });
            USCases.text(Math.ceil(sum));
        }

        return {
            showData: showData
        };
    })();

    // error module
    var displayError = (function() {
        // cache DOM
        var errorModule = $(".error");
        var input = $(".state-input");
        var search_results = $(".search_results");

        // check for error
        function errorCheck(element, home, results) {
            if (!element.text()) {
                home.hide();
                results.hide();
                errorModule.show();
                search_results.text(input.val());
            }
        }

        // hide module
        function hideModule() {
            errorModule.hide();
        }

        return {
            check: errorCheck,
            hideError: hideModule
        }
    })();
});

// global functions
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}