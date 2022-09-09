import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
export default function Navbar() {
  const location=useLocation();
  
  const navigate=useNavigate();

  const logOutUser = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Pnotes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} aria-current="page" to="/about">
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<div className="d-flex">
              <Link className="btn btn-dark mx-1" id="loginbtn" style={{outline:"1px solid white"}} to='/login' role="button">Login</Link>
              <Link className="btn btn-dark mx-1" id="signupbtn" style={{outline:"1px solid white"}} to='/signup' role="button">SignUp</Link>
            </div>:<button className="btn btn-dark mx-1" id="logoutbtn" style={{outline:"1px solid white"}} onClick={logOutUser}>Log Out</button>}
          </div>
        </div>
      </nav>
  );
}
