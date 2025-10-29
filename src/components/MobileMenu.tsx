// @ts-nocheck

import React from 'react';
import { useState, useEffect } from 'react'
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/context/AuthContext';
import { logoutUser } from '@/api/auth';
import { FaChevronDown } from "react-icons/fa";

const MobileMenu = ({ openMobileMenu, setOpenMobileMenu, user, handleLogout }) => {
  const handleCloseMenu = () => {
    setOpenMobileMenu(false);
  }
  
  return (
    <div className={`mobileMenu ${openMobileMenu ? 'open' : 'closed'}`} >
        <ul>
            <li>
                <Link to="/" className="nav-link" onClick={handleCloseMenu}>Home</Link>
            </li>
            <li>
                <span className="nav-link">Actions</span>
                <ul className='ml-1'>
                    <li>
                        <Link to='/cleanups' onClick={handleCloseMenu} activeOptions={{ exact: true }}>All Cleanups</Link>
                    </li>
                    {user && (
                        <li>
                            <Link to='/cleanups/new' onClick={handleCloseMenu}>+ New Cleanup</Link>
                        </li>
                    )}
                    <li>
                        {/* <Link to='/plastic-swaps' onClick={handleCloseMenu} activeOptions={{ exact: true }}>All Plastic Swaps</Link> */}
                        <p style={{ lineHeight: "1.2" }}>All Plastic Swaps (Coming Soon)</p>
                    </li>
                    {user && (
                        <li>
                            {/* <Link to='/plastic-swaps/new' onClick={handleCloseMenu}>+ New Plastic Swap</Link> */}
                            <p style={{ lineHeight: "1.2" }}>+ New Plastic Swap (Coming Soon)</p>
                        </li>
                    )}
                </ul>
            </li>
            <li>
                <Link to="/about" className="nav-link" onClick={handleCloseMenu}>
                About
                </Link>
            </li>
            {user && (
                <li>
                    <Link to='/profile' className="nav-link" onClick={handleCloseMenu}>My Profile</Link>
                </li>
            )}
            {
                !user ? (
                <>
                    <li>
                        <Link to="/signup" className="nav-link" onClick={handleCloseMenu}>
                            <button className="btn btn-primary">Sign Up</button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="nav-link" onClick={handleCloseMenu}>
                            <button className="btn">Log In</button>
                        </Link>
                    </li>
                </>
                ) : (
                <>
                    <li>
                        <button onClick={handleCloseMenu, handleLogout} className="btn btn-danger nav-link">Log Out</button>
                    </li>
                </>
                )
            }
        </ul>
    </div>
  )
}

export default MobileMenu
