//first create a variable that is the whole express package
const express = require("express");
//second create an instance of the express() and name it app
const app = express();
//this creates a variable named morgan that is the package
const morgan = require("morgan");
//path is native to js
const path = require("path");

//import json data of pizzas
const pizzaData = require("./data/pizzas.json");
//app.use creates a middleware
app.use(morgan("dev"));
//the express.jsn("don middleware allows your frontend to send POST requests
app.use(express.json());
//the express.static tells your express server where to find all the static files
app.use(express.static("public"));
//routes
//routes require a minimum of two arguments
//1.path
//2.callback function
app.get("/pizzas", (request, response, next) => {
  //.send if just to send a string back
  //   response.send(__dirname);
  //the path.join checks the OS of the system and joins the folders together correctly
  response.sendFile(path.join(__dirname, "views", "pizzas.html"));
});
//an about page route
app.get("/about", (req, res) => {
  //   res.send("the about page route");
  res.sendFile(__dirname + "/views/about.html");
});
//contact us page route
app.get("/contact", (req, res) => {
  //   res.send("contact page route works");
  res.sendFile(__dirname + "/views/contact.html");
});

//API routes
app.get("/api/pizzas", (req, res) => {
  //send pizza array as data
  res.status(200).json(pizzaData);
});

//this is the incorrect way to do a not found page
// app.get("*", (req, res) => {
//   res.sendFile(__dirname + "/views/notFound.html");
// });
//the correct way to do not found page
app.use((req, res) => {
  res.sendFile(__dirname + "/views/notFound.html");
});
//start listening to a port on you computer
//the .listen method takes two arguments
//1. is the port number
//2. a callback function to call when it starts
app.listen(5005, () => {
  console.log("server running on port 5005");
});
