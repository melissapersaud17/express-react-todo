const express = require("express");
const cors = require("cors");

const port = 3001;
const app = express();

app.use(cors());
app.use(express.json());

let toDoList = [];
let id = 1;

app.get("/", (req, res) => {
  console.log("ROOT");
  res.end(JSON.stringify(toDoList));
});

app.post("/", (req, res) => {
  let todo = req.body;
  todo.id = id++;
  toDoList.push(todo);
  res.end(JSON.stringify(todo));
});

app.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let index = toDoList.findIndex((todo) => todo.id === id);
  toDoList[index].task = req.body.task;
  res.send(JSON.stringify(toDoList[index]));
});

app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  toDoList = toDoList.filter((item) => item.id !== id);
  res.send(JSON.stringify({}));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
