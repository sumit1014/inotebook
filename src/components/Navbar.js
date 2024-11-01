import React from 'react'
import {Link,useLocation, useNavigate } from 'react-router-dom'


const Navbar = () => {
    let navigate = useNavigate();
    let location = useLocation();
    const handlelogout =()=>{
      localStorage.removeItem('token');
      navigate('/login');
    }
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
    <div className="container-fluid">
      <Link className="navbar-brand">i-notebook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
        {localStorage.getItem('token')?<li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/" ? "active":""}`} aria-current="page" to="/">Home</Link>
          </li>:""}
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/about" ? "active":""}`} to="/about">About</Link>
          </li>
        </ul>
        {!localStorage.getItem('token')?<div className="d-flex ms-auto">
          <Link className="btn btn-dark btn-sm mx-2" to="/signup" role="button">Sign up</Link>        
          <Link className="btn btn-dark btn-sm" to="/login" role="button">Login</Link>
      </div>:<button className="btn btn-dark btn-sm d-flex ms-auto" onClick={handlelogout}>Logout</button> }
      </div>
    </div>
  </nav>
  )
}

export default Navbar
