const mongoDbStore = require("connect-mongodb-session");
const session = require("express-session");
require("dotenv").config();
const createSessionStore = () => {
  const MongoDbStore = mongoDbStore(session);

  const store = new MongoDbStore({
    uri: process.env.uri,
    databaseName: "online-shop",
    collection: "sessions",
  });

  return store;
};

const createSessionConfig = () => {
  return {
    secret: process.env.cookieSecret,
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 30 * 60 * 1000,
    },
  };
};

module.exports = createSessionConfig;
