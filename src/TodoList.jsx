import React, { useState, useEffect } from "react";

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  console.log(tasks);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask.trim(), completed: false }]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setEditingTask(index);
    setEditedTaskText(tasks[index].text);
  };

  const handleSaveEdit = (index) => {
    if (editedTaskText.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[index] = {
        ...updatedTasks[index],
        text: editedTaskText.trim(),
      };
      setTasks(updatedTasks);
      setEditingTask(null);
      setEditedTaskText("");
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditedTaskText("");
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,
    };
    setTasks(updatedTasks);
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        margin: "20px",
      }}
    >
      <div className="text-center">
        <h1>Todo List</h1>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            style={{ padding: "5px", marginRight: "5px" }}
          />
          <button onClick={handleAddTask} style={{ padding: "5px" }}>
            Add
          </button>
        </div>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "5px",
            }}
          >
            {editingTask === index ? (
              <>
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                  style={{ padding: "5px", marginRight: "5px", flexGrow: 1 }}
                />
                <button
                  onClick={() => handleSaveEdit(index)}
                  style={{ padding: "5px", marginRight: "5px" }}
                >
                  Save
                </button>
                <button onClick={handleCancelEdit} style={{ padding: "5px" }}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    flexGrow: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => handleCompleteTask(index)}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => handleEditTask(index)}
                  style={{ padding: "5px", marginRight: "5px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(index)}
                  style={{ padding: "5px" }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
