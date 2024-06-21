import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import icon from "../../assets/delete.png";
import Swal from "sweetalert2";
import axios from "../../api";
import "./User.css";
import Skeleton from "../skeleton/Skeleton";
import { motion } from "framer-motion";

const User = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user-data"));

  useEffect(() => {
    setLoading(true);
    axios
      .get("/users/search", { params: { limit: 1000 } })
      .then((res) => setData(res.data.data.users))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const deleteUserById = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to remove User from the cart?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/users/${id}`)
          .then(() => {
            Swal.fire(
              "Deleted!",
              `User has been removed from the cart.`,
              "success"
            );
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            Swal.fire("Error!", "Failed to delete user.", "error");
          });
      }
    });
  };

  let userItems = data?.map((el, inx) => (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 1.3, delay: inx * 0.2 }}
      className="user__card"
      key={el.id}
    >
      <img width={150} height={150} src={logo} alt="logo" />
      <h2>{el.FirstName}</h2>
      <h2>{el.LastName}</h2>
      {userData?.role === "owner" ? (
        <button onClick={() => deleteUserById(el.id)} className="user__delete">
          <img width={30} height={30} src={icon} alt="icon" />
        </button>
      ) : (
        <></>
      )}
    </motion.div>
  ));
  return (
    <div>
      <section className="user">
        <div className="container">
          <h1>User</h1>
          <div className="user__cards">{userItems}</div>
        </div>
      </section>
      {loading ? <Skeleton /> : <></>}
    </div>
  );
};

export default User;
