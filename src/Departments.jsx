import React, { useState, useEffect, useContext } from "react";
import { Context } from "./main";

function Departments() {
  const { departmentsUpdate, setDepartmentsUpdate } = useContext(Context);
  const [departments, setDepartments] = useState(() => {
    const storedDepartments = localStorage.getItem("departments");
    return storedDepartments ? JSON.parse(storedDepartments) : [];
  });

  const [newDepartment, setNewDepartment] = useState("");
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editedDepartmentText, setEditedDepartmentText] = useState("");

  useEffect(() => {
    localStorage.setItem("departments", JSON.stringify(departments));
    setDepartmentsUpdate(!departmentsUpdate);
  }, [departments]);

  const handleAddDepartment = () => {
    if (newDepartment.trim() !== "") {
      setDepartments([...departments, { text: newDepartment.trim() }]);
      setNewDepartment("");
    }
  };

  const handleDeleteDepartment = (index) => {
    const updatedTasks = departments.filter((_, i) => i !== index);
    setDepartments(updatedTasks);
  };

  const handleEditDepartment = (index) => {
    setEditingDepartment(index);
    setEditedDepartmentText(departments[index].text);
  };

  const handleSaveEdit = (index) => {
    if (editedDepartmentText.trim() !== "") {
      const updatedTasks = [...departments];
      updatedTasks[index] = {
        ...updatedTasks[index],
        text: editedDepartmentText.trim(),
      };
      setDepartments(updatedTasks);
      setEditingDepartment(null);
      setEditedDepartmentText("");
    }
  };

  const handleCancelEdit = () => {
    setEditingDepartment(null);
    setEditedDepartmentText("");
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        margin: "20px",
      }}
    >
      <div className="text-center">
        <h1>Departments</h1>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            placeholder="Add a new Department"
            style={{ padding: "5px", marginRight: "5px" }}
          />
          <button onClick={handleAddDepartment} style={{ padding: "5px" }}>
            Add
          </button>
        </div>
      </div>
      <ul>
        {departments.map((task, index) => (
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
            {editingDepartment === index ? (
              <>
                <input
                  type="text"
                  value={editedDepartmentText}
                  onChange={(e) => setEditedDepartmentText(e.target.value)}
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
                    flexGrow: 1,
                  }}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => handleEditDepartment(index)}
                  style={{ padding: "5px", marginRight: "5px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteDepartment(index)}
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

export default Departments;
