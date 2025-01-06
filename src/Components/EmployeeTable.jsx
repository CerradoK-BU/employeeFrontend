import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { listEmployees, deleteEmployee, getUserRoles } from '../services/EmployeeService';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
    checkUserRoles();
  }, []);

  const getAllEmployees = () => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const checkUserRoles = () => {
    getUserRoles()
      .then((response) => {
        const roles = response.data;
        setIsAdmin(roles.includes('ROLE_ADMIN'));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addNewEmployee = () => {
    navigator('/add-employee');
  };

  const updateEmployee = (id) => {
    navigator(`/edit-employee/${id}`);
  };

  const removeEmployee = (id) => {
    if (confirm('Are you sure you want to delete?') === true) {
      deleteEmployee(id)
        .then((response) => {
          navigator('/employee');
          getAllEmployees();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Employees List</h2>
      <div className="mb-3">
        {isAdmin && (
          <button onClick={addNewEmployee} className="btn fs-5 fw-bold addBtn">
            Add Employee
          </button>
        )}
      </div>
      <div className="table-wrap">
        <table className="table table-hover table-bordered">
          <thead>
            <tr className="text-center">
              <th>Employee Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Job Title</th>
              <th>Department Name</th>
              <th>Department Lead</th>
              {isAdmin && (
                <th>Action</th>
              )}
              
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr className="text-center" key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.jobTitle}</td>
                <td>{employee.departmentName}</td>
                <td>{employee.departmentLead}</td>
                
                  {isAdmin && (
                    <td>
                      <Button
                        variant="info"
                        onClick={() => updateEmployee(employee.id)}
                        className="me-2 updBtn"
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => removeEmployee(employee.id)}
                        className="delBtn"
                      >
                        Delete
                      </Button>
                      </td>
                  )}
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
