import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = (props) => {
  const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate = useNavigate();
  const host = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password}), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);

    if(json.success) {
      // Save the authtoken and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/")
      props.showAlert("User logged in successfully", "success");
    }
    else {
      // props.showAlert(json.message || json.error || json.errors || json.errors[0].msg, "danger");
      props.showAlert("Invalid Credentials", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={credentials.email}
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
