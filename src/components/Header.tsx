import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router';
import logo from '../assets/logos/logo-project-earth-health.png';
import { useAuth } from '@/context/AuthContext';
import { logoutUser } from '@/api/auth';
import { FaChevronDown } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser, setAccessToken } = useAuth();

  const [openSubmenu, setOpenSubmenu] = useState(false);

  const handleMouseEnter = () => {
    setOpenSubmenu(true);
  }

  const handleMouseLeave = () => {
    setOpenSubmenu(false);
  }
  
  const handleLogout = async () => {
    try {
      await logoutUser();
      setAccessToken(null);
      setUser(null);
      navigate({ to: '/' })
    } catch (err: any) {
      console.error('Logout failed: ', err)
    }
  }

  return (
    <header className="bg-primary--dark pt">
      <div className="container navbar grid-2">
        <Link to="/" className="active-ignore">
          <img src={logo} alt="Project Earth Health" style={{ width: "auto", height: "48px" }} />
        </Link>
        <div className="navbar-right">
          <div className="burger" id="burger">
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </div>
          <span className="overlay"></span>
          <ul className="menu">
            <li className="menu-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="menu-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <span className="nav-link">Cleanups <FaChevronDown style={{ verticalAlign: '-0.125em' }} /></span>
              <ul className="submenu" style={{ visibility: openSubmenu ? 'visible' : 'hidden' }}>
                <li className="submenu-link">
                  <Link to='/cleanups' activeOptions={{ exact: true }}>All Cleanups</Link>
                </li>
                {user && (
                  <li className="submenu-link">
                    <Link to='/cleanups/new'>+ New Cleanup</Link>
                  </li>
                )}
              </ul>
            </li>
            <li className="menu-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            {user && (
              <li className="menu-item">
                <Link to='/profile' className="nav-link">My Profile</Link>
              </li>
            )}
            {
              !user ? (
                <>
                  <li className="menu-item">
                    <Link to="/signup" className="nav-link">
                      <button className="btn btn-primary">Sign Up</button>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/login" className="nav-link">
                      <button className="btn">Log In</button>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="menu-item">
                    <button onClick={handleLogout} className="btn btn-danger nav-link">Log Out</button>
                  </li>
                </>
              )
            }
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
