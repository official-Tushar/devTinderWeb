import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      }, {withCredentials: true});
      dispatch(addUser(res.data));
      return navigate("/");
    }catch(err){
      setError(err.response.data || "Something went wrong");
    }
  }

  const handleSignUp = async () => {
    try{
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        emailId,
        password,
      }, {withCredentials: true});
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    }catch(err){
      setError(err.response.data || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-center mt-26 mb-8">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">
          {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          {!isLoginForm && (<>
            <fieldset className="fieldset my-1">
            <legend className="fieldset-legend">First Name</legend>
            <input type="text" value={firstName} className="input"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset my-1">
            <legend className="fieldset-legend">Last Name</legend>
            <input type="text" value={lastName} className="input"
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>
          </>)}

          <fieldset className="fieldset my-1">
            <legend className="fieldset-legend">E-mail ID</legend>
            <input type="text" value={emailId} className="input"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset my-1">
            <legend className="fieldset-legend">Password</legend>
            <input type="text" value={password} className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm ?
            handleLogin : handleSignUp}>
            {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <p className="text-white cursor-pointer" onClick={() => setIsLoginForm(!isLoginForm)}>
          {isLoginForm ? "New User? Sign Up here" : "Already a User? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
