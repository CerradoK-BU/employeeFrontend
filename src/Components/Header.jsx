import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigator = useNavigate(); 
  function backToPortfolio(){
    navigator('/portfolio')
  }

  return (
    <div >
        <header>
            <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
              <div>
                {/* <button className='btn backbtn mb-2 fs-6' onClick={backToPortfolio}>Back</button> */}
                <a href='/employee' className='navbar-brand ms-2 fs-4'>Employee Management System</a>
              </div>
            </nav>
        </header>
    </div>
  )
}

export default Header