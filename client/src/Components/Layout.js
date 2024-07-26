import React from "react";
import "../Style/Layout.css";
import logo from "../Components/Images/Brand Logo.jpg"; // Ensure there are no spaces in the filename
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Badge } from "antd";

function Layout({ children }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logged out successfully");
    navigate("/login");
  };

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  const sidebarMenu = user?.isAdmin
    ? adminMenu(user?._id)
    : user?.isDoctor
    ? doctorMenu
    : userMenu(user?._id);

  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>Healing Hands Medical Center</h6>
            <img src={logo} alt="Brand Logo" />
            <hr />
          </div>
          <div className="menu">
            {sidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  key={menu.path}
                  className={`menu-item ${isActive ? "active" : ""}`}
                >
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className={`menu-item `} onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content">
              <Badge count={user && user.notification.length}>
                <i
                  className="fa-solid fa-bell"
                  onClick={() => {
                    navigate("/notification");
                  }}
                  style={{ cursor: "pointer" }}
                ></i>
              </Badge>
              <Link to={`/profile/${user?._id}`}>{user?.name}</Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
