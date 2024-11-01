import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [creds, setCreds] = useState({name:"",email:"",password:"",cpassword:""});
    let navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {name,email,password} = creds;
         //API call
       const response = await fetch(`http://localhost:5000/api/auth/createuser`,{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({name,email,password})
      });
      const json = await response.json();
      console.log(json);
        //redirect
      if (json.success){
        localStorage.setItem('token',json.authToken);
        navigate('/');
        props.showAlert("Account has been created successfully","success");

      }
      else{
        props.showAlert("Invalid credentials","danger");
      } 
    }
    const onChange = (e)=>{
        setCreds({...creds,[e.target.name]:e.target.value})
    }
  return (
    <div className="container w-50">
    <h3 className="my-4">Create an account</h3>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control border-2"
         id="name"  name="name" value={creds.name}
         onChange={onChange}  aria-describedby="emailHelp"/> 
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control border-2"
         id="email"  name="email" value={creds.email}
         onChange={onChange}  aria-describedby="emailHelp"/> 
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password" 
          className="form-control border-2"
          onChange={onChange} id="password" name="password" value={creds.password} minLength={5} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          Password
        </label>
        <input
          type="password" 
          className="form-control border-2"
          onChange={onChange} id="cpassword" name="cpassword" value={creds.cpassword} minLength={5} required/>
      </div>
      <button type="submit" className="btn btn-success w-100">
        Register
      </button>
    </form>
  </div>
  )
}

export default Signup
