import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

export const listEmployees = () => {
    return axios.get(REST_API_BASE_URL);
}

export const addEmployees = (employee) => axios.post(REST_API_BASE_URL, employee);

export const getEmployees = (employeeId) => axios.get(REST_API_BASE_URL + '/' + employeeId);

export const updateEmployees = (employeeId, employee) => axios.put(REST_API_BASE_URL + '/' + employeeId, employee);

export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL + '/' + employeeId);

export const getUserRoles = () => axios.get('/api/user/roles'); 