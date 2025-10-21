// @ts-nocheck

import React from 'react';
import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/context/AuthContext';
import { logoutUser } from '@/api/auth';
import { FaChevronDown } from "react-icons/fa";

const MobileMenu = ({ openMobileMenu, user }) => {
  return (
    <div className={`mobileMenu ${openMobileMenu ? 'open' : 'closed'}`} >
        <ul>
            <li>
                <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
                <span className="nav-link">Cleanups <FaChevronDown style={{ verticalAlign: '-0.125em' }} /></span>
                <ul>
                    <li>
                        <Link to='/cleanups' activeOptions={{ exact: true }}>All Cleanups</Link>
                    </li>
                    {user && (
                        <li>
                        <Link to='/cleanups/new'>+ New Cleanup</Link>
                        </li>
                    )}
                </ul>
            </li>
            <li>
                <Link to="/about" className="nav-link">
                About
                </Link>
            </li>
            {user && (
                <li>
                    <Link to='/profile' className="nav-link">My Profile</Link>
                </li>
            )}
            {
                !user ? (
                <>
                    <li>
                        <Link to="/signup" className="nav-link">
                            <button className="btn btn-primary">Sign Up</button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="nav-link">
                            <button className="btn">Log In</button>
                        </Link>
                    </li>
                </>
                ) : (
                <>
                    <li>
                        <button onClick={handleLogout} className="btn btn-danger nav-link">Log Out</button>
                    </li>
                </>
                )
            }
        </ul>
    </div>
  )
}

export default MobileMenu
