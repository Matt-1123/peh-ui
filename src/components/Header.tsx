import { Link } from '@tanstack/react-router';
import logo from '../assets/logos/logo-project-earth-health.png';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const { user } = useAuth();
  
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
          <Link
            to='/cleanups'
          >
            Cleanups
          </Link>
          {user && (
            <Link to='/cleanups/new'>+ New Cleanup</Link>
          )}
          <Link to="/about">
            About
          </Link>
          {user && (
            <Link to='/profile'>My Profile</Link>
          )}
          {
            !user ? (
              <>
                <Link to="/signup">
                  <button className="btn btn-primary">Sign Up</button>
                </Link>
                <Link to="/login">
                  <button className="btn">Log In</button>
                </Link>
              </>
            ) : (
              <>
                {/* <span>Welcome, { user.username }</span> */}
                <Link to="/login">
                  <button className="btn btn-danger">Log Out</button>
                </Link>
              </>
            )
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
