const express = require("express");
const csrf = require("csurf");
const session = require("express-session");
const createSessionConfig = require("./config/session.config");
const path = require("path");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const baseRoutes = require("./routes/base.routes");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const checkAuthStatus = require("./middlewares/check-auth");
const db = require("./database/onlineshop");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const sessionConfig = createSessionConfig();
app.use(session(sessionConfig));
app.use(checkAuthStatus);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(csrf());
app.use(addCsrfTokenMiddleware);
app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);

app.use(notFound);
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
