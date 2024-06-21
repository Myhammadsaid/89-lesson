import React from "react";
import { motion } from "framer-motion";
import { useGetInputValue } from "../../hooks/useGetInputValue";
import axios from "../../api";
import "./Register.css";

const initialState = {
  FirstName: "",
  LastName: "",
  phones: "",
  UserName: "",
  password: "",
};
const Register = () => {
  const { formData, handleChange, setFormData } =
    useGetInputValue(initialState);

  const handleCreateUser = (e) => {
    e.preventDefault();
    formData.phones = [formData.phones];
    axios.post("/auth/user/sign-up", formData);
    setFormData(initialState);
  };
  return (
    <div>
      <motion.section
        initial={{ opacity: 0, translateY: 100 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 1.2, stiffness: 200, type: "spring" }}
        className="register"
      >
        <div className="container">
          <h1>Register</h1>
          <form onSubmit={handleCreateUser} className="register__form">
            <input
              value={formData.FirstName}
              onChange={handleChange}
              required
              type="text"
              name="FirstName"
              placeholder="FirstName"
              className="register__input"
            />
            <input
              value={formData.LastName}
              onChange={handleChange}
              required
              type="text"
              name="LastName"
              placeholder="LastName"
              className="register__input"
            />
            <input
              value={formData.UserName}
              onChange={handleChange}
              required
              type="text"
              name="UserName"
              placeholder="LastName"
              className="register__input"
            />
            <input
              value={formData.phones}
              onChange={handleChange}
              required
              type="number"
              name="phones"
              placeholder="Phone"
              className="register__input"
            />
            <input
              value={formData.password}
              onChange={handleChange}
              required
              type="password"
              name="password"
              placeholder="Password"
              className="register__input"
            />
            <button className="register__btn">Register</button>
          </form>
        </div>
      </motion.section>
    </div>
  );
};

export default Register;
