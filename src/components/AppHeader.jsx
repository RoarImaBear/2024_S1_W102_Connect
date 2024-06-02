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
          <NavLink exact to="/matches" activeClassName="active">
            Matches
          </NavLink>
        </li>
        <li id="logo-link">
          <NavLink exact to="/feed" activeClassName="active">✈</NavLink>
        </li>
        <li>
          <NavLink exact to="/profile" activeClassName="active">
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
