import "../styles/main-style.css";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export function Header() {
  return (
    <header>
      <ul>
        <li>
          <Link to="/matches">Matches</Link>
        </li>
        <li>
          <Link to="/feed">
            <img src="../images/globe-icon.svg" alt="Nav icon." />
          </Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </header>
  );
}

export default Header;
