import { Link } from '@tanstack/react-router';
import logo from '../assets/logos/logo-project-earth-health.png';

const Header = () => {
  return (
    <header className="bg-primary--dark pt">
      <div className="container navbar grid-2">
        <Link to="/">
          <img src={logo} alt="Project Earth Health" style={{ width: "auto", height: "48px" }} />
        </Link>
        <div className="navbar-right">
          <Link to="/">
            Home
          </Link>
          <Link to="/about">
            About
          </Link>
          <Link
            to='/cleanups'
          >
            Cleanups
          </Link>
          <Link
            to='/cleanups/new'
          >
            + New Cleanup
          </Link>
          <Link to="/profile">
            My Profile
          </Link>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
