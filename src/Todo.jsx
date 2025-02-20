import React, { useState, useEffect } from "react";
import { BsTypeH5 } from "react-icons/bs";

function TodoList1() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [additionalInputs, setAdditionalInputs] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (index, field, value) => {
    if (index === null) {
      setNewTodo({ ...newTodo, [field]: value });
    } else {
      const updatedInputs = [...additionalInputs];
      updatedInputs[index] = { ...updatedInputs[index], [field]: value };
      setAdditionalInputs(updatedInputs);
    }
  };

  const handleAddMore = () => {
    setAdditionalInputs([...additionalInputs, { title: "", description: "" }]);
  };

  const handleSave = () => {
    const allTodos = [...todos];

    if (newTodo.title || newTodo.description) {
      allTodos.push(newTodo);
    }

    additionalInputs.forEach((input) => {
      if (input.title || input.description) {
        allTodos.push(input);
      }
    });

    setTodos(allTodos);
    setNewTodo({ title: "", description: "", completed: false });
    setAdditionalInputs([]);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleUpdate = (index) => {
    const updatedTodos = [...todos];
    if (index < additionalInputs.length) {
      updatedTodos[index] = additionalInputs[index];
    } else {
      updatedTodos[index] = newTodo;
    }
    setTodos(updatedTodos);
    setEditingIndex(null);
    setNewTodo({ title: "", description: "", completed: false });
    setAdditionalInputs([]);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  return (
    <div className="container text-center ">
      <h2
        style={{ marginBottom: "40px", color: "#91f086", fontWeight: "bolder" }}
      >
        Todo List
      </h2>

      <div>
        <label style={{ marginRight: "10px" }}>Title :</label>
        <span>
          <input
            type="text"
            style={{ marginRight: "10px" }}
            value={newTodo.title}
            onChange={(e) => handleInputChange(null, "title", e.target.value)}
          />
        </span>
        <label style={{ marginRight: "10px" }}>Description :</label>
        <span>
          <input
            type="text"
            value={newTodo.description}
            onChange={(e) =>
              handleInputChange(null, "description", e.target.value)
            }
          />
        </span>
      </div>

      {additionalInputs.map((input, index) => (
        <div key={index}>
          <label style={{ marginRight: "10px" }}>Title :</label>
          <span>
            <input
              type="text"
              style={{ marginRight: "10px" }}
              value={input.title}
              onChange={(e) =>
                handleInputChange(index, "title", e.target.value)
              }
            />
          </span>
          <label style={{ marginRight: "10px" }}>Description :</label>
          <span>
            <input
              type="text"
              value={input.description}
              onChange={(e) =>
                handleInputChange(index, "description", e.target.value)
              }
            />
          </span>
        </div>
      ))}

      <button
        style={{ marginTop: "20px", marginBottom: "20px" }}
        onClick={handleAddMore}
      >
        Add More
      </button>
      <button
        style={{ marginTop: "20px", marginBottom: "20px" }}
        onClick={handleSave}
      >
        Save
      </button>

      <ul style={{ listStyle: "none" }}>
        {todos.length > 0 ? (
          <h5 style={{ color: "purple", fontWeight: "bold" }}>Your TODOs :</h5>
        ) : null}
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              marginBottom: "10px",
            }}
          >
            <strong>{todo.title}</strong>: {todo.description}
            <button
              style={{ marginLeft: "20px" }}
              onClick={() => handleComplete(index)}
            >
              {todo.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={todo.title}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={todo.description}
                  onChange={(e) =>
                    handleInputChange(index, "description", e.target.value)
                  }
                />
                <button onClick={() => handleUpdate(index)}>Update</button>
              </div>
            ) : (
              <button onClick={() => handleEdit(index)}>Edit</button>
            )}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList1;
