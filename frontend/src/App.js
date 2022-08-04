import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001")
      .then((res) => res.json())
      .then((todoList) => setTodos(todoList));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const body = {
      task: userInput,
    };

    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((todo) => {
        console.log(todo);
        setTodos((todos) => [...todos, todo]);
      });
    setUserInput("");
  };

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleComplete = (event) => {
    event.preventDefault();
    const id = parseInt(event.target.value);

    fetch(`http://localhost:3001/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((todo) => {
        console.log(todo);
        setTodos(todos.filter((todo) => todo.id !== id));
      });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const id = parseInt(event.target.value);
    const updatedItem = prompt("update your task");

    const body = {
      task: updatedItem,
    };

    fetch(`http://localhost:3001/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((todo) => {
        const index = todos.findIndex((x) => x.id === todo.id);
        const newTodos = [...todos];
        newTodos[index].task = todo.task;
        setTodos(newTodos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1 align="center">ToDo List</h1>
      <form align="center" onSubmit={handleSubmit}>
        <label>Enter in a task:</label>
        <input
          onChange={handleChange}
          type="text"
          value={userInput}
          placeholder="clean dishes"
          required
        />
        <button type="submit">Add Task</button>
      </form>
      <br></br>

      {todos.map((todo) => {
        return (
          <div align="center" key={todo.id}>
            <ul>
              <TodoItem
                todo={todo}
                handleComplete={handleComplete}
                handleUpdate={handleUpdate}
              />
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default App;
