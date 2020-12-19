import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";
import { Link, Redirect } from "react-router-dom";

export default function Signin() {
  const [values, setValues] = useState({
    name: "",
    email: "subham6@gmail.com",
    password: "nopass",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
  });

  const {
    name,
    email,
    password,
    error,
    success,
    loading,
    didRedirect,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        console.log(data);
        if (data.token) {
          // const sessionToken = data.token;
          const jwt = {
            token: data.token,
            user: {
              id: data.user.id,
              name: data.user.name,
              email : data.user.email,
              session_token : data.user.session_token
            },
          };
          authenticate(jwt, () => {
            console.log("Token Added");
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        } else {
          setValues({
            ...values,
            loading: false,
          });
        }
      })
      .catch((error) => console.log(error.message));
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/" />;
    }
  };

  // const performRedirect = () => {
  //   if (isAuthenticated()) {
  //     return <Redirect to="/" />;
  //   }
  // };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading..</h2>
        </div>
      )
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account Created successfully, Please{" "}
            <Link to="/signin"> Login now </Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Check all fields again
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
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
            <button className="btn btn-success btn-block" onClick={onSubmit}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In page">
      {loadingMessage()}
      {signInForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
      {performRedirect()}
    </Base>
  );
}
