import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";


import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import PropTypes from "prop-types";

import "../styles/Form.css";

const Form = ({route,method}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const nmethod = method === "login" ? "Login" : "Register";
  const handlesubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
   const data = {username,password,};
    try {
        const response = await api.post(route, data);
        if (method === "login") {
          localStorage.setItem(ACCESS_TOKEN, response.data.access);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
            navigate("/");
        }
        else {
          navigate("/login");
        }
        
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handlesubmit} className="from-container">
      <h1>{nmethod}</h1>
      <input
        className="form-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="form-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="form-button" type="submit">
        {nmethod}
      </button>
    </form>
  );
};


Form.propTypes = {
    route: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
};

export default Form;
