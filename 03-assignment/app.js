const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("First Middleware");
  next();
});

app.use((req, res, next) => {
  console.log("Second Middleware");
  next();
});

app.use("/users", (req, res, next) => {
  res.send(`<h1>Users</h1>`);
});

app.use("/", (req, res, next) => {
  res.send(`<h1>Home</h1>`);
});

app.listen(3000);
