const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.city;
  const apiKey = "c3854bcbf893ee6d29174985b8ed5907";
  const units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&lang=es&appid=" + apiKey

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
      res.write("<h1>La temperatura en "+query+" es de "+temp+" grados</h1>");
      res.write("<p>El tiempo: " + description + "</p>");
      res.write("<img src=" + icon + ">");
      res.send();

    })
  });

});

app.listen(3000, function() {
  console.log("Server is running on port 3000.")
});
