import React,{ useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../context/AlertContext";
const Login = () => {
    const alertContext=useContext(AlertContext);
    const {showAlert}=alertContext;

    const [credentials,setCredentials]=useState({email:"",password:""});
    
    let navigate = useNavigate();
    const onFieldsChange= (event)=>{
        //TODO find
        setCredentials({...credentials,[event.target.name]:event.target.value});
    }

    const loginUser = async (event) => {
        event.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email:credentials.email,password:credentials.password}),
        });
        const json=await response.json();
        if(json.success)
        {
            localStorage.setItem('token',json.authToken);
            navigate("/", { replace: true });
            setCredentials({email:"",password:""});
            showAlert("User Logged in Successful","success");
        }
        else
          showAlert("Invalid Credentials","danger");
    };
  return (
    <div className="container">
      <h1 className="my-3">Login User</h1>
      <form onSubmit={loginUser}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp" onChange={onFieldsChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password" onChange={onFieldsChange}
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
