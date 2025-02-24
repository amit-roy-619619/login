import React, { useContext, useEffect, useState } from "react";
import { Context } from "./main";
import { toast } from "react-toastify";

const EmployeeUpdate = () => {
  const { departmentsUpdate, setDepartmentsUpdate } = useContext(Context);
  const [employees, setEmployees] = useState(() => {
    return JSON.parse(localStorage.getItem("employees")) || [];
  });
  const [departments, setDepartments] = useState(() => {
    return JSON.parse(localStorage.getItem("departments")) || [];
  });
  const [editOrNot, setEditOrNot] = useState(false);
  const [editingEmployeeIndex, setEditingEmployeeIndex] = useState(null);
  //console.log(employees[editingEmployeeIndex].empId);
  const [editedFormData, setEditedFormData] = useState({});

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const diff = new Date() - birthDate;
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  };

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    setDepartments(JSON.parse(localStorage.getItem("departments"))) || [];
  }, [departmentsUpdate]);

  const handleEditPress = (index) => {
    console.log(index);
    setEditingEmployeeIndex(index);
    setEditOrNot(true);
    employees.map((emp, i) => {
      if (i === index) {
        setEditedFormData({
          empId: employees[index].empId ?? "",
          empName: employees[index].empName ?? "",
          dob: employees[index].dob ?? "",
          age: employees[index].age ?? "",
          department: employees[index].department ?? "",
          gender: employees[index].gender ?? "",
          role: employees[index].role ?? "",
          qualifications: employees[index].qualifications ?? [
            { degree: "", year: "", grade: "" },
          ],
        });
      }
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      setEditedFormData({
        ...editedFormData,
        [name]: value,
        age: calculateAge(value),
      });
    } else {
      setEditedFormData({ ...editedFormData, [name]: value });
    }
  };

  const handleQualificationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQualifications = editedFormData.qualifications.map((q, i) =>
      i === index ? { ...q, [name]: value } : q
    );
    setEditedFormData({
      ...editedFormData,
      qualifications: updatedQualifications,
    });
  };

  const addQualification = () => {
    setEditedFormData({
      ...editedFormData,
      qualifications: [
        ...editedFormData.qualifications,
        { degree: "", year: "", grade: "" },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //setEmployees([...employees, editedFormData]);
    //setEmployees(employees.splice(editingEmployeeIndex, 1, editedFormData));
    employees.map((emp, i) => {
      if (i === editingEmployeeIndex) {
        emp.empId = editedFormData.empId;
        emp.empName = editedFormData.empName;
        emp.dob = editedFormData.dob;
        emp.age = editedFormData.age;
        emp.department = editedFormData.department;
        emp.gender = editedFormData.gender;
        emp.qualifications = editedFormData.qualifications;
        setEmployees([...employees]);
      }
    });
    setEditedFormData({
      empId: "",
      empName: "",
      dob: "",
      age: "",
      department: "",
      gender: "",
      role: "",
      qualifications: [{ degree: "", year: "", grade: "" }],
    });
    setEditingEmployeeIndex(null);
    toast.success("Employee Details Updated!");
  };

  const handleDeletePress = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  if (!editOrNot) {
    return (
      <>
        <div>
          <div className="container mt-5">
            <h2 className="text-center text-primary mb-4">Employee Details</h2>
            <div className="row g-4">
              {employees.map((emp, i) => {
                return (
                  <div className="col-md-4" key={i}>
                    <div className="card shadow p-4">
                      <div className="border-bottom py-2">
                        <strong>ID:</strong> {emp.empId}
                      </div>
                      <div className="border-bottom py-2">
                        <strong>Name:</strong> {emp.empName}
                      </div>
                      <div className="border-bottom py-2">
                        <strong>DOB:</strong> {emp.dob}
                      </div>
                      <div className="border-bottom py-2">
                        <strong>Age:</strong> {emp.age}
                      </div>
                      <div className="border-bottom py-2">
                        <strong>Department:</strong> {emp.department}
                      </div>
                      <div className="border-bottom py-2">
                        <strong>Gender:</strong> {emp.gender}
                      </div>
                      <div className="border-bottom py-2">
                        <strong>Role:</strong> {emp.role}
                      </div>
                      <div className="mt-3">
                        <h3 className="text-secondary">Qualifications</h3>
                        <table className="table table-bordered">
                          <thead className="table-light">
                            <tr>
                              <th>Degree</th>
                              <th>Year</th>
                              <th>Grade</th>
                            </tr>
                          </thead>
                          <tbody>
                            {emp.qualifications.map((quali, index) => {
                              return (
                                <tr key={index}>
                                  <td>{quali.degree}</td>
                                  <td>{quali.year}</td>
                                  <td>{quali.grade}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <button
                        onClick={() => {
                          handleEditPress(i);
                        }}
                        className="btn btn-primary mb-2"
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDeletePress(i);
                        }}
                      >
                        Delete
                      </button>
                    </div>

                    <div></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="d-flex justify-content-center">
        <form style={{ width: "500px" }}>
          <div className="mb-3">
            <label className="form-label">Employee ID</label>
            <input
              type="text"
              name="empId"
              className="form-control"
              aria-describedby="emailHelp"
              value={editedFormData.empId}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Employee Name</label>
            <input
              type="text"
              className="form-control"
              value={editedFormData.empName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date Of Bith</label>
            <input
              type="date"
              className="form-control"
              value={editedFormData.dob}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={editedFormData.age}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Department</label>
            <select
              className="form-control"
              value={editedFormData.department}
              onChange={handleChange}
            >
              {departments.map((dep, i) => {
                return (
                  <option key={i} value={dep.text}>
                    {dep.text}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <div>
              <input
                type="radio"
                value="Male"
                checked={editedFormData.gender === "Male"}
                onChange={handleChange}
              />{" "}
              Male
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={editedFormData.gender === "Female"}
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
              value={editedFormData.role}
              onChange={handleChange}
            >
              <option>Admin</option>
              <option>Manager</option>
              <option>TL</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Qualifications:</label>
            {editedFormData.qualifications.map((q, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  className="form-control mb-1"
                  name="degree"
                  placeholder="Degree Name"
                  value={q.degree}
                  required
                  onChange={(e) => {
                    handleQualificationChange(index, e);
                  }}
                />
                <input
                  type="text"
                  className="form-control mb-1"
                  name="year"
                  placeholder="Year of Passing"
                  value={q.year}
                  required
                  onChange={(e) => {
                    handleQualificationChange(index, e);
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  name="grade"
                  placeholder="Grade"
                  value={q.grade}
                  required
                  onChange={(e) => {
                    handleQualificationChange(index, e);
                  }}
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

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Update
          </button>
        </form>
      </div>
    );
  }
};

export default EmployeeUpdate;
