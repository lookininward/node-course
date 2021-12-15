const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const router = express.Router();

const users = [];

router.get("/", (req, res, next) => {
  res.render("home", {
    pageTitle: "home",
    path: "/",
  });
});

router.get("/users", (req, res, next) => {
  res.render("users", {
    pageTitle: "users",
    path: "/users",
    users,
  });
});

router.post("/add-name", (req, res, next) => {
  const { name } = req.body;
  users.push(name);
  res.redirect("/users");
});

app.use(router);

app.use((req, res, next) => {
  res.render("404", {
    pageTitle: "Page Not Found",
  });
});

app.listen(3000);
