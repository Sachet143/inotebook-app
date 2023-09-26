import React, { useState } from "react";
import { useNavigate } from "react-router";

const Signup = (props) => {
  const [user, setUser] = useState({name: "", email: "", password: "", cpassword: ""})
  let navigate = useNavigate();
  const host = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = user;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password}), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);
    if(json.success) {
      // Save the authtoken and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("User account created successfully", "success");
    }
    else {
      props.showAlert("Invalid Details", "danger");
    }
  }


  const onChange = (e) => {
    setUser({...user,[e.target.name]:e.target.value});
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="nameHelp"
            placeholder="Enter name"
            value={user.name}
            onChange={onChange}
            minLength={3}
            required
          />
        </div>
        <div className="form-group my-3">
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
            value={user.email}
            onChange={onChange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm Password"
            value={user.cpassword}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
