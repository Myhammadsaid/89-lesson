import React, { useState } from "react";
import { useGetInputValue } from "../../hooks/useGetInputValue";
import { motion } from "framer-motion";
import axios from "../../api";
import "./Login.css";

const initialState = {
  UserName: "",
  password: "",
};

const Login = () => {
  const { formData, handleChange, setFormData } =
    useGetInputValue(initialState);
  const [reload, setReload] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("/auth/sign-in", formData)
      .then((res) => {
        localStorage.setItem("x-auth-token", res.data.data.token);
        localStorage.setItem("user-data", JSON.stringify(res.data.data.user));
        setReload(true);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
    setFormData(initialState);
  };

  if (reload) {
    window.location.reload();
  }

  return (
    <div>
      <motion.section
        initial={{ opacity: 0, translateY: 100 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 1.2, stiffness: 200, type: "spring" }}
        className="login"
      >
        <div className="container">
          <h1>Login</h1>
          <form onSubmit={handleLogin} className="login__form">
            <input
              value={formData.UserName}
              onChange={handleChange}
              required
              className="login__input"
              name="UserName"
              type="text"
              placeholder="UserName"
            />
            <input
              value={formData.password}
              onChange={handleChange}
              required
              className="login__input"
              name="password"
              type="password"
              placeholder="Password"
            />
            <button className="login__btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </motion.section>
    </div>
  );
};

export default Login;
