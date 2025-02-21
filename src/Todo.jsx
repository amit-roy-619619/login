import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputs, setInputs] = useState([
    { title: "", description: "", completed: false },
  ]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  const handleInputChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const addMore = () => {
    setInputs([...inputs, { title: "", description: "", completed: false }]);
  };

  const saveTodos = () => {
    const newTodos = [...todos, ...inputs];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setInputs([{ title: "", description: "", completed: false }]);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setInputs([{ ...todos[index] }]);
  };

  const saveNow = () => {
    const updatedTodos = [...todos];
    updatedTodos[editIndex] = inputs[0];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setEditIndex(null);
    setInputs([{ title: "", description: "", completed: false }]);
  };

  const toggleCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Todo List</h1>
      {inputs.map((input, index) => (
        <div key={index} className="mb-3 d-flex gap-2">
          <input
            type="text"
            placeholder="Title"
            value={input.title}
            onChange={(e) => {
              handleInputChange(index, "title", e.target.value);
            }}
            className="form-control"
          />
          <input
            type="text"
            placeholder="Description"
            value={input.description}
            onChange={(e) =>
              handleInputChange(index, "description", e.target.value)
            }
            className="form-control"
          />
        </div>
      ))}
      <button onClick={addMore} className="btn btn-outline-dark me-2">
        Add More
      </button>
      {editIndex === null ? (
        <button onClick={saveTodos} className="btn btn-outline-dark">
          Save
        </button>
      ) : (
        <button onClick={saveNow} className="btn btn-outline-dark">
          Save Now
        </button>
      )}
      <h2 className="mt-5">Saved Todos</h2>
      {todos.map((todo, index) => (
        <div
          key={index}
          className="border p-2 my-2 d-flex justify-content-between align-items-center"
        >
          <div
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            <strong>{todo.title}</strong>: {todo.description}
          </div>
          <div>
            <button
              onClick={() => toggleCompletion(index)}
              className="btn btn-outline-dark me-2"
            >
              {todo.completed ? "Mark as Pending" : "Mark as Completed"}
            </button>
            <button
              onClick={() => editTodo(index)}
              className="btn btn-outline-dark me-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(index)}
              className="btn btn-outline-dark"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
