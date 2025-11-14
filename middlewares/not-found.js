const notFound = (req, res, next) => {
  res.status(404).render("shared/404");
  next();
};

module.exports = notFound;
