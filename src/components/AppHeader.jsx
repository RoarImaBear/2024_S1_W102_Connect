import "../styles/main-style.css";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export function Header() {
  return (
    <header>
      <h1 id="connect">connect</h1>
      <ul>
        <li id="invisible-child"></li>
        <li>
          <NavLink to="/matches" activeclassname="active">
            Matches
          </NavLink>
        </li>
        <li id="logo-link">
          <NavLink to="/feed" activeclassname="active">
            ✈
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeclassname="active">
            Profile
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </header>
  );
}

export default Header;
