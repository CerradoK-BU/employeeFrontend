import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import '../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import {addEmployees, getEmployees, updateEmployees} from '../services/EmployeeService'

const AddEmployee = (props) => {

  const navigator = useNavigate(); 
  const {id} = useParams(); 

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [jobTitle, setjobTitle] = useState('')
  const [departmentName, setdepartmentName] = useState('')
  const [departmentLead, setdepartmentLead] = useState('')

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    departmentName: '',
    departmentLead: ''
  })

  useEffect(() => {
    if(id){
        getEmployees(id).then((response) => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
            setjobTitle(response.data.jobTitle);
            setdepartmentName(response.data.departmentName);
            setdepartmentLead(response.data.departmentLead);
        }).catch(error =>{
            console.error(error);
        })
    }
  }, [id])

  function validationForm(){
    let valid = true;
    const errorsCopy = {...errors}
    if(firstName.trim()){
        errorsCopy.firstName = '';
    }else{
        errorsCopy.firstName = 'First name is required';
        valid = false;
    }
    if(lastName.trim()){
        errorsCopy.lastName = '';
    }else{
        errorsCopy.lastName = 'Last name is required';
        valid = false;
    }
    if(email.trim()){
        errorsCopy.email = '';
    }else{
        errorsCopy.email = 'Email is required';
        valid = false;
    }
    if(jobTitle.trim()){
        errorsCopy.jobTitle = '';
    }else{
        errorsCopy.jobTitle = 'Job Title is required';
        valid = false;
    }
    if(departmentName.trim()){
        errorsCopy.departmentName = '';
    }else{
        errorsCopy.departmentName = 'Department name is required';
        valid = false;
    }
    if(departmentLead.trim()){
        errorsCopy.departmentLead = '';
    }else{
        errorsCopy.departmentLead = 'Department lead is required';
        valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  function backToHomePage(){
    navigator('/employee')
  }

  function saveUpdateEmployee(e){
    e.preventDefault();
    if(validationForm()){
        const employee = {firstName, lastName, email, jobTitle, departmentName, departmentLead}
        if(id){
            updateEmployees(id, employee).then((response) => {
                navigator('/employee')
            }).catch(error => {
                console.error(error);
            })
        }else{
            addEmployees(employee).then((response) => {
                navigator('/employee')
            }).catch(error => {
                console.error(error);     
            }) 
        } 
    }
  }

  function pageTitle(){
    if(id){
        return props.updateTitle
    }else{
        return props.title
    }
  }

  return (
    <div className="container-fluid">
      <div className='addEmployee mt-3'>
        <button className='btn backbtn mb-2 fs-5' onClick={backToHomePage}>Back</button>
        <h2 className="mb-3 addTitle">{pageTitle()}</h2>
      </div>

      <div className='container card form-container'>
          <Form className='empForm mt-4'>
            <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control className={`${errors.firstName ? 'is-invalid' : ''}`} type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control className={`${errors.lastName ? 'is-invalid' : ''}`} type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control className={`${errors.email ? 'is-invalid' : ''}`} type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <Form.Control className={`${errors.jobTitle ? 'is-invalid' : ''}`} type="text" name="jobTitle" value={jobTitle} onChange={(e) => setjobTitle(e.target.value)} />
              <Form.Control.Feedback type="invalid">
                    {errors.jobTitle}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department Name</Form.Label>
              <Form.Control className={`${errors.departmentName ? 'is-invalid' : ''}`} type="text" name="departmentName" value={departmentName} onChange={(e) => setdepartmentName(e.target.value)} />
              <Form.Control.Feedback type="invalid">
                    {errors.jobTitle}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department Lead</Form.Label>
              <Form.Control className={`${errors.departmentLead ? 'is-invalid' : ''}`} type="text" name="departmentLead" value={departmentLead} onChange={(e) => setdepartmentLead(e.target.value)} />
              <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                </Form.Control.Feedback>
            </Form.Group>
            <div className='text-center my-3'>
              <button className="btn fs-5 fw-bold submitBtn" onClick={saveUpdateEmployee}>{props.buttonName}</button>
            </div>
          </Form>
      </div>
    </div>
  );
}

export default AddEmployee;