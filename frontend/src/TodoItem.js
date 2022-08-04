const TodoItem = ({ todo, handleComplete, handleUpdate }) => {
  return (
    <div>
      <li>
        {todo.task}
        <button type="button" onClick={handleComplete} value={todo.id}>
          Complete
        </button>
        <button type="button" onClick={handleUpdate} value={todo.id}>
          Update
        </button>
        <button type="button" onClick={handleComplete} value={todo.id}>
          Delete
        </button>
      </li>
      <br></br>
      <br></br>
    </div>
  );
};

export default TodoItem;
