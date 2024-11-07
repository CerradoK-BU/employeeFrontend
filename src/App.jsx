import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import EmployeeTable from './Components/EmployeeTable';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AddEmployee from './Components/AddEmployee';




const App = () => {

  return (
    <>

      <BrowserRouter>
        <Header/>
          <Routes>
      
            <Route path='/employee' element= {<EmployeeTable />}></Route>
            {/* <Route path='/employees' element= {<EmployeeTable/>}></Route>  */}
            <Route path='/add-employee' element= {<AddEmployee title="Add Employee" buttonName="Submit"/>}></Route>
            <Route path='/edit-employee/:id' element= {<AddEmployee updateTitle="Update Employee" buttonName="Update"/>}></Route>  
          </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
