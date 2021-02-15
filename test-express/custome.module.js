function logger(req, res, next) {
  console.log("Middle Ware");
  next();
}

module.exports = logger;
