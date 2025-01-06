import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import EmployeeTable from './Components/EmployeeTable';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AddEmployee from './Components/AddEmployee';

import { getUserRoles } from './services/EmployeeService';

const App = () => {
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    fetchUserRoles();
  }, []);

  const fetchUserRoles = async () => {
    try {
      const response = await getUserRoles();
      const roles = response.data;
      setIsAdmin(roles.includes('ROLE_ADMIN'));
    } catch (error) {
      console.error("Failed to fetch user roles" + error);
    }
  };

  return (
    <>

      <BrowserRouter>
        <Header/>
          <Routes>
      
            <Route path='/employee'  element= {<EmployeeTable />}></Route>
            {/* <Route path='/employees' element= {<EmployeeTable/>}></Route>  */}
            <Route path='/add-employee' element= {isAdmin ? <AddEmployee 
              title="Add Employee" buttonName="Submit"/> 
              : 
              <Navigate to="/employee"/> }></Route>
            <Route path='/edit-employee/:id' element= {isAdmin ? <AddEmployee 
              updateTitle="Update Employee" buttonName="Update"/> 
              :
              <Navigate to="/employee"/>  
            }></Route>  
          </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
