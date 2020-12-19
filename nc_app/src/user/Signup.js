import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper/index";
import { Link } from "react-router-dom";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) =>{
    event.preventDefault();
    setValues({ ...values, error: false })
    signup({ name, email, password })
    .then(data =>{
        console.log(data);
        if(data.email === email){
            setValues({
                ...values,
                name : "",
                email : "",
                password : "",
                error : "",
                success : true
            })
        }else{
            setValues({
                ...values,
                error : true,
                success : false
            })
        }
    })
    .catch((error) => console.log(error.message))
  }

  const successMessage = () =>{
    return(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                 <div 
                    className="alert alert-success" 
                    style={{ display: success ? "" : "none" }}>
                     New Account Created successfully, Please <Link to="/signin"> Login now </Link>
                 </div>
            </div>
        </div>
    )
  }

  const errorMessage = () =>{
    return(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                 <div 
                    className="alert alert-danger" 
                    style={{ display: error ? "" : "none" }}>
                     Check all fields again
                 </div>
            </div>
        </div>
    )
  }

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={handleChange("name")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={handleChange("password")}
              />
            </div>
            <button 
                className="btn btn-success btn-block"
                onClick={onSubmit}
            >
                Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign Up Page" description="A Signup for user">
    {successMessage()}
    {errorMessage()}
      {signUpForm()}
      {/* <p className="text-white text-center">
        {JSON.stringify(values)}
      </p> */}
    </Base>
  );
}
