/* Global Variables */
api_key = "&appid=0d25017d052ba09067ed0b8f034e79a5";
url = "https://api.openweathermap.org/data/2.5/weather?units=metric&zip=";

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "-" + d.getDate() + "-" + d.getFullYear();

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8000;
app.listen(port, listening);

function listening() {
  console.log("Server running");
  console.log(`Running on localhost: ${port}`);
}

// Start up an instance of app
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cors for cross origin allowance
const corsOptions = {
  origin: "http://127.0.0.1:5500", // Update with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type", // Add your required headers
};
app.use(cors(corsOptions));

// Initialize the main project folder
//app.use(express.static("website"));

// Setup Server
app.get(`/`, async (req, res) => {
  const zipcode = req.query.zipcode;
  const feeling = req.query.feeling;

  try {
    const response = await fetch(`${url}${zipcode}${api_key}`);
    const data = await response.json();
    //passing data to projectData
    projectData.temperature = data.main.temp;
    projectData.date = newDate;
    projectData.country = data.sys.country;
    projectData.userResponse = feeling;

    console.log(projectData);
    res.send(projectData);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// app.post("/addWeather", (req, res) => {
//   console.log(req.body);
//   const data = req.body;
//   projectData.temperature = data.temperature;
//   projectData.date = data.date;
//   projectData.userResponse = data.userResponse;
// });
