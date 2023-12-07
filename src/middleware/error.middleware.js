const logger = require("../config/logger.config");

exports.serverErrorHandler = (err, req, res, next) => {
  res.status(500).json({ error: err });
}

exports.notFoundHandler = (req, res, next) => {
  logger.warn("Warning: 404 Page Not Found");
  res.status(404).json("404 Page Not Found");
}