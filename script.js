$(function() {
    // search module
    var search = (function() {
        // cache DOM
        var btn = $(".search button");
        var doc = $(document);
        var input = $(".state-input");
        var filterMod = $(".filter");

        // events
        btn.click(displayData);
        doc.keypress(function(e) {
            var key = (e.keyCode ? e.keyCode : e.which);
            if (key == "13") {
                e.preventDefault();
                displayData();
                filterList.off();
            }
        });
        input.keyup(function() {
            filterList.on();
        });
        $("body").on("click", ".filter a", function(e) {
            e.preventDefault();
            var clickedStateName = e.currentTarget.innerText;
            input.val(clickedStateName);
            input.focus();
        });

        // hide the home page and display data
        function displayData() {
            loading.on();
            filterList.off();
            $.ajax({
                method: "GET",
                url: "https://corona.lmao.ninja/v2/states",
                success: function(data) {
                    loading.off();
                    results.showData(data);
                }
            });
        }

        // filter thru list of states
        var filterList = {
            on: function() {
                $.ajax({
                    method: "GET",
                    url: "states.json",
                    success: function(data) {
    
                        // match search input with name of state
                        var matches = data.filter(function(state) {
                            var regEx = new RegExp("^" + input.val(), "gi");
                            return state.name.match(regEx);
                        });
                        if (input.val().length === 0) {
                            matches = [];
                            filterList.off();
                        }
                        outputMatches(matches);
                    } 
                });
                // show results to html
                function outputMatches(matches) {
                    if (matches.length > 0) {
                        var html = matches.map(function(match) {
                            return "<a href='#'>"+ match.name +"</a>";
                        }).join("");
                        filterMod.html(html);
                    }
                }
            },
            off: function() {
                filterMod.html("");
            }
        };
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
        var percentBar = $(".percent_bar");
        var USCases = $("#USCases");
        var filter = $(".filter");

        // display results
        function showData(data) {
            hideWhenClicked.hide();
            results.show();
            homeBtn.on();
            filter.html("");
            var value = toTitleCase(input.val()).trim(); // "new york" -> "New York"
            var totalSum = 0;

            $.each(data, function(i, val) {
                totalSum += data[i].cases;
                if (value === data[i].state) {
                    displayError.hideError();
                    render.display(searchResults, data[i].state);
                    render.display(totalCases, data[i].cases);
                    render.countUp("casesToday", data[i].todayCases);
                    render.countUp("totalDeaths", data[i].deaths);
                    render.countUp("deathsToday", data[i].todayDeaths);
                }
            });
            renderBar(totalSum, function() {
                render.countUp("totalCases", totalCases.text());
                render.countUp("USCases", USCases.text());
            });
            displayError.check(casesToday, hideWhenClicked, results);
        }

        // render html
        var render = {
            countUp: function(id, number) {
                var c = new CountUp(id, 0, number);
                c.start();
            },
            display: function(element, number) {
                element.text(number);
            }
        };

        // calculate percentage
        function percentage(cases, total) {
            var percent = cases / total;
            return 100 - Math.ceil(percent * 100);
        }

        // display percentage bar 
        function renderBar(sum, callback) {
            percentBar.css({
                right: "100%"
            });
            setTimeout(function() {
                percentBar.css({
                    right: "" + percentage(parseInt(totalCases.text()), Math.ceil(sum)) + "%"
                });
                callback();
            }, 100);
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