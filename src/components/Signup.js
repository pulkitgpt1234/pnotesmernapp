import React ,{ useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../context/AlertContext";

const Signup = () => {
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cPassword:""});

  const alertContext=useContext(AlertContext);
  const {showAlert}=alertContext;

  let navigate = useNavigate();
  const onFieldsChange= (event)=>{
    //TODO find
    setCredentials({...credentials,[event.target.name]:event.target.value});
  }

  const signUpUser=async(event)=>{
    event.preventDefault();
    if(credentials.cPassword===credentials.password)
    {
    const response=await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name:credentials.name, email:credentials.email, password:credentials.password }),
        });
        const json=await response.json();
        if(json.success)
        {
            navigate("/login", { replace: true });
            setCredentials({name:"",email:"",password:"",cPassword:""});
            showAlert("User succesfully Created","success");
        }
        else
          showAlert("User not created. Possible Reasons: Server Error or User already exists","danger");
      }
      else
      {
        showAlert("Passwords did not match","danger");
      }
  }
  return (
    <div className="container">
      <h1 className="my-3">Sign Up a User</h1>
      <form onSubmit={signUpUser}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onFieldsChange} minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onFieldsChange} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onFieldsChange} minLength={6} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cPassword"
            name="cPassword"
            onChange={onFieldsChange} minLength={6} required
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
