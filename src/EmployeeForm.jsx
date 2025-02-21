import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

const EmployeeForm = () => {
  const [employees, setEmployees] = useState(() => {
    return JSON.parse(localStorage.getItem("employees")) || [];
  });
  const [formData, setFormData] = useState({
    empId: "",
    empName: "",
    dob: "",
    age: "",
    department: "Sales",
    gender: "Male",
    role: "Admin",
    qualifications: [{ degree: "", year: "", grade: "" }],
  });

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const diff = new Date() - birthDate;
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      setFormData({ ...formData, [name]: value, age: calculateAge(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleQualificationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQualifications = formData.qualifications.map((q, i) =>
      i === index ? { ...q, [name]: value } : q
    );
    setFormData({ ...formData, qualifications: updatedQualifications });
  };

  const addQualification = () => {
    setFormData({
      ...formData,
      qualifications: [
        ...formData.qualifications,
        { degree: "", year: "", grade: "" },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmployees([...employees, formData]);
    setFormData({
      empId: "",
      empName: "",
      dob: "",
      age: "",
      department: "Sales",
      gender: "Male",
      role: "Admin",
      qualifications: [{ degree: "", year: "", grade: "" }],
    });
    toast.success("Employee Details Saved!");
  };

  return (
    <div className="container mt-4">
      <h2>Employee Details Entry Form</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded">
        <div className="mb-3">
          <label className="form-label">Emp ID:</label>
          <input
            type="text"
            className="form-control"
            name="empId"
            value={formData.empId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Emp Name:</label>
          <input
            type="text"
            className="form-control"
            name="empName"
            value={formData.empName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth:</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age:</label>
          <input
            type="text"
            className="form-control"
            value={formData.age}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department:</label>
          <select
            className="form-control"
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option>Sales</option>
            <option>Production</option>
            <option>Marketing</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Gender:</label>
          <div>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />{" "}
            Male
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              className="ms-3"
            />{" "}
            Female
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Role:</label>
          <select
            className="form-control"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option>Admin</option>
            <option>Manager</option>
            <option>TL</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Qualifications:</label>
          {formData.qualifications.map((q, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                className="form-control mb-1"
                name="degree"
                placeholder="Degree Name"
                value={q.degree}
                onChange={(e) => handleQualificationChange(index, e)}
                required
              />
              <input
                type="text"
                className="form-control mb-1"
                name="year"
                placeholder="Year of Passing"
                value={q.year}
                onChange={(e) => handleQualificationChange(index, e)}
                required
              />
              <input
                type="text"
                className="form-control"
                name="grade"
                placeholder="Grade"
                value={q.grade}
                onChange={(e) => handleQualificationChange(index, e)}
                required
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary mt-2"
            onClick={addQualification}
          >
            Add Qualification
          </button>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
