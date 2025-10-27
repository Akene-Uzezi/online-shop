const express = require("express");
const path = require("path");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const baseRoutes = require("./routes/base.routes");
const csrf = require("csurf");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const session = require("express-session");
const createSessionConfig = require("./config/session.config");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const checkAuthStatus = require("./middlewares/check-auth");
const bodyParser = require("body-parser");
const db = require("./database/onlineshop");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const sessionConfig = createSessionConfig();
app.use(session(sessionConfig));
app.use(csrf());
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatus);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(() => {
    app.listen(3000);
    console.log("Connected to the database and started the server");
  })
  .catch((err) => {
    console.log("Failed to connect");
    console.log(err);
  });
