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
                <ul className='ml-1 mb-1'>
                    <li>
                        <Link to='/actions/cleanups' onClick={handleCloseMenu} activeOptions={{ exact: true }}>All Cleanups</Link>
                    </li>
                    {user && (
                        <li>
                            <Link to='/actions/cleanups/new' onClick={handleCloseMenu}>+ New Cleanup</Link>
                        </li>
                    )}
                    <hr className='my-1'/>
                    <li>
                        <Link to='/actions/diet' onClick={handleCloseMenu} activeOptions={{ exact: true }}>All Diet Actions</Link>
                    </li>
                    {user && (
                        <li>
                            <Link to='/actions/diet/new' onClick={handleCloseMenu}>+ New Diet Action</Link>
                        </li>
                    )}
                    <hr className='my-1'/>
                    <li>
                        {/* <Link to='/actions/plastic-swaps' onClick={handleCloseMenu} activeOptions={{ exact: true }}>All Plastic Swaps</Link> */}
                        <p style={{ lineHeight: "1.2" }}>All Plastic Swaps (Coming Soon)</p>
                    </li>
                    {user && (
                        <li>
                            {/* <Link to='/actions/plastic-swaps/new' onClick={handleCloseMenu}>+ New Plastic Swap</Link> */}
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
                    <Link to='/profile' className="nav-link mb-1" onClick={handleCloseMenu}>My Profile</Link>
                </li>
            )}
            {
                !user ? (
                <>
                    <li style={{ marginTop: '1rem' }}>
                        <Link to="/signup" className="nav-link" onClick={handleCloseMenu}>
                            <button className="btn btn-primary">Sign Up</button>
                        </Link>
                    </li>
                    <li style={{ marginTop: '1rem' }}>
                        <Link to="/login" className="nav-link" onClick={handleCloseMenu}>
                            <button className="btn">Log In</button>
                        </Link>
                    </li>
                </>
                ) : (
                <>
                    <li>
                        <button onClick={handleCloseMenu, handleLogout} className="btn btn-danger nav-link my-1">Log Out</button>
                    </li>
                </>
                )
            }
        </ul>
    </div>
  )
}

export default MobileMenu
