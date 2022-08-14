import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Layout.css";
import { useSelector } from "react-redux";
import { Badge } from "antd";
const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const userMenu = [
    { name: "Home", link: "/", icon: "ri-home-line" },
    { name: "Appointment", link: "/appointment", icon: "ri-file-list-line" },
    { name: "Apply Doctor", link: "/apply-doctor", icon: "ri-hospital-line" },
    { name: "Profile", link: "/profile", icon: "ri-user-line" },
  ];
  const adminMenu = [
    { name: "Home", link: "/", icon: "ri-home-line" },
    { name: "Users", link: "/users", icon: "ri-user-line" },
    { name: "Doctors", link: "/doctors", icon: "ri-hospital-line" },
    { name: "Profile", link: "/profile", icon: "ri-user-line" },
  ];
  const menuToBeRenderd = user?.isAdmin ? adminMenu : userMenu;
  return (
    <>
      <div className="main p-2">
        <div className="d-flex layout">
          <div className="sidebar">
            <div className="sidebar-header">
              <h4>Doc APP</h4>
            </div>
            <div className="menu">
              {menuToBeRenderd.map((menu, i) => {
                const isActive = location.pathname === menu.link;
                return (
                  <div
                    key={i}
                    className={`d-flex menu-item ${
                      isActive && "menu-item-active "
                    }`}
                  >
                    <i className={menu.icon}></i>
                    {!collapsed && <Link to={menu.link}>{menu.name}</Link>}
                  </div>
                );
              })}
              <div className="d-flex menu-item">
                <i className="ri-login-box-line"></i>
                {!collapsed && (
                  <Link
                    to="/login"
                    onClick={() => {
                      navigate("/login");
                      localStorage.removeItem("token");
                    }}
                  >
                    Logout
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              {collapsed ? (
                <i
                  className="ri-close-fill header-action-icon"
                  onClick={() => setCollapsed(false)}
                ></i>
              ) : (
                <i
                  className="ri-menu-2-fill header-action-icon"
                  onClick={() => setCollapsed(true)}
                ></i>
              )}
              <div className="d-flex align-items-center px-3">
                <Badge
                  count={
                    user &&
                    user.unseenNotification &&
                    user.unseenNotification.length
                  }
                >
                  <i className="ri-notification-line header-action-icon mx-3"></i>
                </Badge>
                <Link className="anchor" to="/profile">
                  {user && user.name}
                </Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
