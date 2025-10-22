const express = require("express");
const path = require("path");
const authRoutes = require("./routes/auth.routes");
const csrf = require("csurf");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const db = require("./database/onlineshop");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(csrf());
app.use(addCsrfTokenMiddleware);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(authRoutes);

db.connectToDatabase()
  .then(() => {
    app.listen(3000);
    console.log("Connected to the database and started the server");
  })
  .catch((err) => {
    console.log("Failed to connect");
    console.log(err);
  });
