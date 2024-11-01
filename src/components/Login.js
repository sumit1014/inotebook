import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const [creds, setCreds] = useState({email:"",password:""});
    let navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
         //API call
       const response = await fetch(`http://localhost:5000/api/auth/loginuser`,{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({email:creds.email,password:creds.password})
      });
      const json = await response.json();
      console.log(json);
      if (json.success && json.authToken) {
        // Store token and navigate
        localStorage.setItem('token', json.authToken);
        props.showAlert("User logged in successfully", "success");
        navigate("/");
    } else {
        props.showAlert("Invalid credentials", "danger");
    }
    }
    const onChange = (e)=>{
        setCreds({...creds,[e.target.name]:e.target.value})
    }
  return (
    <div className="container w-50">
      <h3 className="my-4">Login User</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control border-2"
           id="email"  name="email" value={creds.email}
           onChange={onChange}  aria-describedby="emailHelp"
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password" 
            className="form-control border-2"
            onChange={onChange} id="password" name="password" value={creds.password}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login
