import { useState, useEffect } from "react";

import { NavLink } from ".";
import { userService } from "services";

export { Nav };

function Nav() {
  function logout() {
    userService.logout();
  }

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav">
          <NavLink href="/" exact className="nav-item nav-link">
            Home
          </NavLink>
          <a onClick={logout} className="nav-item nav-link">
            Logout
          </a>
        </div>
      </nav>
    </>
  );
}
