const db = require("../db");

const TodoModel = {
  create: (userId, description, status, callback) => {
    const query =
      "INSERT INTO todos (user_id, description, status) VALUES (?, ?, ?)";
    db.run(query, [userId, description, status], function (err) {
      callback(err, this.lastID);
    });
  },
  findByUserId: (userId, callback) => {
    const query = "SELECT * FROM todos WHERE user_id = ?";
    db.all(query, [userId], (err, todos) => {
      callback(err, todos);
    });
  },
  update: (id, userId, description, status, callback) => {
    const query =
      "UPDATE todos SET description = ?, status = ? WHERE id = ? AND user_id = ?";
    db.run(query, [description, status, id, userId], function (err) {
      callback(err, this.changes);
    });
  },
  delete: (id, userId, callback) => {
    const query = "DELETE FROM todos WHERE id = ? AND user_id = ?";
    db.run(query, [id, userId], function (err) {
      callback(err, this.changes);
    });
  },
};

module.exports = TodoModel;
