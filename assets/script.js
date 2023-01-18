var searchBtn = $(".searchBtn");
var Key = "5bf97659b7fb78f79359ce2e25ac3658";
var keyCount = 0;

searchBtn.click(function () {
    var searchedCity = $(".searchedCity").val();
    var currentForecast = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&Appid=" + Key + "&units=imperial";
    var fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&Appid=" + Key + "&units=imperial";
    
    
    if (searchedCity == "") {
        console.log(searchedCity);
    } else {
        $.ajax({
            url: currentForecast,
            method: "GET"
        }).then(function (response) {
            var currentCity = $(".listContent").addClass("listContentItem");
            currentCity.append("<li>" + response.name + "</li>");
            
            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;
            
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            currentCard.append(currentName);
            
            var time = new Date(response.dt * 1000);
            currentName.append(response.name + " " + time.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            var currentTemp = currentName.append("<p>");
            
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature (F): " + response.main.temp + "</p>");
            currentTemp.append("<p>" + "Humidity Percentage: " + response.main.humidity + "%" + "</p>");
            currentTemp.append("<p>" + "Wind Speed (MPH): " + response.wind.speed + "</p>");
            
            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=5bf97659b7fb78f79359ce2e25ac3658&lat=${response.coord.lat}&lon=${response.coord.lon}`;
            
            $.ajax({
                url: fiveDayForecast,
                method: "GET"
            }).then(function (response) {
                var day = [0, 8, 16, 24, 32];
                var fiveDayCard = $(".fiveDayCard").addClass("card-body");
                var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
                fiveDayDiv.empty();
                day.forEach(function (i) {
                    var fiveDayTime = new Date(response.list[i].dt * 1000);
                    fiveDayTime = fiveDayTime.toLocaleDateString("en-US");
                    fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + fiveDayTime + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");
                })
            });
            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {
                var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
            });
        });

    }
});

// Displays history
for (var i = 0; i < localStorage.length; i++) {
    var city = localStorage.getItem(i);
    var currentCity = $(".listContent").addClass("listContentItem");

    currentCity.append("<li>" + city + "</li>");
}