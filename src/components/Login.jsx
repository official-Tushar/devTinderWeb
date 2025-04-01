import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("tushar@gmail.com");
  const [password, setPassword] = useState("Tushar@123");

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
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
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
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
