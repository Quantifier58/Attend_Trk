import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const body = {
  height: '100vh',
  background: '#c5d1df',
};

const homepageContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '2rem auto',
  padding: '2rem',
  borderRadius: '10px', // Curved corners
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  backgroundColor: '#a8b8ca',
  width: '80%',
  maxWidth: '500px',
};

const h1Style = {
  fontSize: '2.3rem',
  color: '#f9',
  marginBottom: '0px',
};

const hstyle = {
  marginBottom: '0px',
};

const h2style = {
  borderBottom: '1px solid ',
};

const panelStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '2rem',
};

const panelButtonStyle = {
  padding: '1rem',
  margin: '0 1rem',
  fontSize: '1.1rem',
  background: '#333',
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold',
  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  borderRadius: '10px', // Curved corners
  transition: 'background-color 0.2s',
};

const panelButtonHoverStyle = {
  background: '#244ea8',
};


const Homepage = () => {
  return (
    <div style={body}>
    <Navbar/>
    <div style={homepageContainerStyle}>
      <h1 style={h1Style}>Attendance System</h1>
      <h5 style={hstyle}>for</h5>
      <h2 style={h2style}>CS 203 Course</h2>
      <div style={panelStyle}>
        <Link to="/csvdata" style={{ ...panelButtonStyle, ...panelButtonHoverStyle }}>
          Previous Data
        </Link>
        <Link to="/attendance" style={{ ...panelButtonStyle, ...panelButtonHoverStyle }}>
          Mark One
        </Link>
        <Link to="/addsdnt" style={{ ...panelButtonStyle, ...panelButtonHoverStyle }}>
          Add Student
        </Link>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Homepage;
