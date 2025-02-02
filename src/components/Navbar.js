import React from 'react';
import { Link } from 'react-router-dom';

const navbarStyle = {
  background: '#244ea8',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1rem',
  height: '60px', // 2. Increase the height
  alignItems: 'center',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  margin: '0 1rem',
  fontWeight: 'bold', // 1. Make it bolder
  fontSize: "2rem",
  textTransform: 'capitalize', // 3. Make "Mark Attendance" capitalized
};

const rlinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  margin: '0 1rem',
  fontWeight: 'bold', // 1. Make it bolder
  fontSize: "1.2rem",
  textTransform: 'capitalize',
};

const taglineStyle = {
  fontSize: '0.9rem', // 4. Small size
  fontWeight: "100",
  borderBottom: '1px solid #fff',
  margin: '0',
  textAlign: 'right',
};

const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      <Link to="/attendance" style={linkStyle}>
        ATTENDANCE MARKER
        <p style={taglineStyle}>Easy way to take Attendance</p>
      </Link>
      <Link to="/" style={rlinkStyle}>Home</Link>
    </nav>
  );
};

export default Navbar;
