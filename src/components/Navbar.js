import React from "react";
import { useAuth } from "../context/FakeAuthContext";
import { Link } from "react-router-dom";
import { Menu } from "antd";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const items = [
    {
      label: <>{isAuthenticated && <p>Привет, {user.name}!</p>}</>,
      key: "1",
      disabled: true,
    },
    {
      label: <>{!isAuthenticated && <Link to="/auth">Войти</Link>}</>,
      key: "2",
    },
    {
      label: (
        <>
          {isAuthenticated && (
            <a href="" onClick={logout}>
              Выйти
            </a>
          )}
        </>
      ),
      key: "3",
    },
    {
      label: (
        <Link to="/random">Случайный фильм (только для авторизованных)</Link>
      ),
      key: "4",
    },
  ];

  return (
    // <nav>
    //   <ul>
    //     {isAuthenticated && (
    //       <li>
    //         <p>Привет, {user.name}!</p>
    //       </li>
    //     )}
    //     {!isAuthenticated && (
    //       <li>
    //         <Link to="/auth">Войти</Link>
    //       </li>
    //     )}
    //     <li>
    //       <Link to="/random">Случайный фильм (только для авторизованных)</Link>
    //     </li>
    //     {isAuthenticated && (
    //       <li>
    //         <a href="" onClick={logout}>
    //           Выйти
    //         </a>
    //       </li>
    //     )}
    //   </ul>
    // </nav>
    <Menu mode="horizontal" items={items} />
  );
}

export default Navbar;
