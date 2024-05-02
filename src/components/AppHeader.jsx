import "../styles/seb.css";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <ul>
        <li>
          <Link to="/feed">Feed</Link>
        </li>
        <li>
          <Link to="/feed">Home</Link>
        </li>
        <li>
          <Link to="/matches">Matches</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
