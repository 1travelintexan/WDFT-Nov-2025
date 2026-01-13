// IMPORT PACKAGES
// Here you should import the required packages for your Express app: `express` and `morgan`
const express = require("express");
const morgan = require("morgan");
const app = express();
const projectsData = require("./data/projects.json");
const articlesData = require("./data/articles.json");

const pizzasDB = [
  {
    _id: "65a12b3c4d5e6f7a8b9c0d11",
    name: "Classic Margherita",
    size: "Large",
    price: 14.99,
    toppings: [
      "San Marzano Tomatoes",
      "Fresh Mozzarella",
      "Basil",
      "Extra Virgin Olive Oil",
    ],
    is_vegetarian: true,
    calories: 1100,
  },
  {
    _id: "65a12b3c4d5e6f7a8b9c0d12",
    name: "Hot Honey Pepperoni",
    size: "Medium",
    price: 16.5,
    toppings: [
      "Pepperoni",
      "Mozzarella",
      "Red Pepper Flakes",
      "Hot Honey Drizzle",
    ],
    is_vegetarian: false,
    calories: 1750,
  },
  {
    _id: "65a12b3c4d5e6f7a8b9c0d13",
    name: "Garden Special",
    size: "Small",
    price: 13.75,
    toppings: ["Spinach", "Bell Peppers", "Red Onions", "Black Olives", "Feta"],
    is_vegetarian: true,
    calories: 950,
  },
];
// CREATE EXPRESS APP
// Here you should create your Express app:

// MIDDLEWARE
// Here you should set up the required middleware:
// - `express.static()` to serve static files from the `public` folder
// - `express.json()` to parse incoming requests with JSON payloads
// - `morgan` logger to log all incoming requests
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("dev"));
// ROUTES
// Start defining your routes here:
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/home.html");
});
app.get("/blog", (request, response) => {
  response.sendFile(__dirname + "/views/blog.html");
});

//api routes
app.get("/api/projects", (req, res) => {
  res.status(200).json(projectsData);
});
app.get("/api/articles", (req, res) => {
  res.status(200).json(articlesData);
});

//Advanced Routing
//route to get one specific pizza based on its id
app.get("/pizzas/:pizzaId", (req, res) => {
  //route queries are not visiable on the actual route, but only the request
  console.log("Queries:", req.query);

  //this creates a new variable that is the parameter
  //   const thePizzaId = req.params.pizzaId;
  //destructuring the parameter is more common
  const { pizzaId } = req.params;
  const foundPizza = pizzasDB.find((onePizza) => {
    if (onePizza._id === pizzaId) {
      return true;
    }
  });
  //   console.log(pizzaId, foundPizza);

  //checks if the pizza id exists
  if (foundPizza) {
    res.status(200).json(foundPizza);
  } else {
    res.status(404).json({ errorMessage: "Pizza Id not valid" });
  }
});

//404 not found route
app.use((req, res) => {
  res.sendFile(__dirname + "/views/not-found.html");
});
// START THE SERVER
// Make your Express server listen on port 5005:
app.listen(5005, () => {
  console.log("server is running");
});
