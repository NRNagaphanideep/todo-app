const db = require("../db");

exports.createTodo = (req, res) => {
  const { description } = req.body;
  const userId = req.userId;
  const query =
    "INSERT INTO todos (user_id, description, status) VALUES (?, ?, ?)";
  db.run(query, [userId, description, "pending"], function (err) {
    if (err) return res.status(500).send("Error creating todo");
    res.status(201).send({ id: this.lastID });
  });
};

exports.getTodos = (req, res) => {
  const userId = req.userId;
  const query = "SELECT * FROM todos WHERE user_id = ?";
  db.all(query, [userId], (err, todos) => {
    if (err) return res.status(500).send("Error fetching todos");
    res.status(200).send(todos);
  });
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { description, status } = req.body;
  const query =
    "UPDATE todos SET description = ?, status = ? WHERE id = ? AND user_id = ?";
  db.run(query, [description, status, id, req.userId], function (err) {
    if (err) return res.status(500).send("Error updating todo");
    if (this.changes === 0) return res.status(404).send("Todo not found");
    res.status(200).send("Todo updated");
  });
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM todos WHERE id = ? AND user_id = ?";
  db.run(query, [id, req.userId], function (err) {
    if (err) return res.status(500).send("Error deleting todo");
    if (this.changes === 0) return res.status(404).send("Todo not found");
    res.status(200).send("Todo deleted");
  });
};
