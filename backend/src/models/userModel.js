const db = require("../db");

const UserModel = {
  create: (username, password, callback) => {
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.run(query, [username, password], function (err) {
      callback(err, this.lastID);
    });
  },
  findByUsername: (username, callback) => {
    const query = "SELECT * FROM users WHERE username = ?";
    db.get(query, [username], (err, user) => {
      callback(err, user);
    });
  },
};

module.exports = UserModel;
