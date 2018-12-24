const bookshelf = require('../bookshelf');

class User extends bookshelf.Model {
  get tableName() { return "users"; }
  get hasTimestamps() { return false; }
}

module.exports = bookshelf.model('User', User);
