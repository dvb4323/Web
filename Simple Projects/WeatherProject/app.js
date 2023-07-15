const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req, res){
    const tempUnit = req.body.tempUnit;
    const apiKey = "6d41a14862d158fcf2383bfd4af59179";
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+ apiKey +"&units="+ tempUnit +"";
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            // console.log(data);
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            console.log(temp);
            console.log(weatherDescription);
            res.write("<p>The weather is currently " + weatherDescription + "<p>");
            res.write("<h1>The Temperature of "+query+" is " + temp + " Degree</h1>");
            res.write("<img src=" + imageURL + ">");
            // res.send("<h1>The Temperature of London is " + temp + " Celsius Degree</h1>" );
            res.send();
        });
    });
    console.log("Request Received.");
});











app.listen(3000, function(){
    console.log("Server is running at port 3000.");
});