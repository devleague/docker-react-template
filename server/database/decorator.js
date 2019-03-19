const User = require('./models/User');

module.exports = function(req, res, next) {
  req.database = { User };
  next();
}
