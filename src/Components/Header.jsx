import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigator = useNavigate(); 
  const backToPortfolio = () => {
    window.location.href = '/logout'
  }

  return (
    <div >
        <header>
            <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className='d-flex justify-content-between align-items-center w-100'>
              <a href='/employee' className='navbar-brand ms-2 fs-4'>Employee Management System</a>
              <button onClick={backToPortfolio} className='navbar-brand btn backbtn'>Back to Portfolio</button>
            </div>
            </nav>
        </header>
    </div>
  )
}

export default Header