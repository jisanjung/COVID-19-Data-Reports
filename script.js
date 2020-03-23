$(function() {
    // search module
    var search = (function() {
        // cache DOM
        var btn = $(".search button");
        var doc = $(document);

        // events
        btn.click(displayData);
        doc.keypress(function(e) {
            var key = (e.keyCode ? e.keyCode : e.which);
            if (key == "13") {
                e.preventDefault();
                displayData();
            }
        });

        // hide the home page and display data
        function displayData() {
            loading.on();
            $.ajax({
                method: "GET",
                url: "https://corona.lmao.ninja/states",
                success: function(data) {
                    loading.off();
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
            homeBtn.on();
            var value = toTitleCase(input.val()).trim(); // "new york" -> "New York"
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
                homeBtn.on();
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

    // home button
    var homeBtn = (function() {
        // cache DOM
        var backHome = $(".back_home");

        // events
        backHome.click(reload);

        // on
        function showButton() {
            backHome.show();
        }

        // off
        function hideButton() {
            backHome.hide();
        }

        return {
            on: showButton,
            off: hideButton
        };
    })();

    // loading module
    var loading = (function() {
        // cache DOM
        var loadingMod = $(".loading");

        // on
        function showLoad() {
            loadingMod.show();
        }

        // off
        function hideLoad() {
            loadingMod.hide();
        }

        return {
            on: showLoad,
            off: hideLoad
        };
    })();
});

// global functions
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
function reload() {
    window.location.reload(true);
}