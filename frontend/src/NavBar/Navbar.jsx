import React from "react";
import { useNavigate,Link } from "react-router-dom";
import './Navbar.css';
const Navbar = () => {
    const navigate=useNavigate();
  return (
    <>
      <nav>
        <h3>Form</h3>
        <ul>
          <li>
            <a onClick={() => navigate("/")}>User</a>
            {/* <Link to="/create/user">Users</Link> */}
          </li>
          <li>
            <a onClick={() => navigate("view")}>View</a>
            {/* <Link to="/create/view">View </Link> */}
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;