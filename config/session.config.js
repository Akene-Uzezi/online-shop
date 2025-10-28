const mongoDbStore = require("connect-mongodb-session");
const session = require("express-session");
const createSessionStore = () => {
  const MongoDbStore = mongoDbStore(session);

  const store = new MongoDbStore({
    uri: "mongodb://localhost:27017",
    databaseName: "online-shop",
    collection: "sessions",
  });

  return store;
};

const createSessionConfig = () => {
  return {
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 30 * 60 * 1000,
    },
  };
};

module.exports = createSessionConfig;
