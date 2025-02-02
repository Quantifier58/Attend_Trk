import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import Homepage from './components/Homepage';
import AttendanceForm from './components/AttendanceForm/AttendanceForm';
import CsvTable from './components/PreviousData';
import AddStudentForm from './components/AddStudent/AddStudentForm';
import PersonForm from './components/person';
import Page from './components/issue';
import './App.css'; // Import the CSS file for global styles

import Buttons from './components/Buttons/Buttons';

function App() {
  return (
    <Routes>
        <Route path="/" exact element={<Homepage/>} />
        <Route path="/attendance" element={<AttendanceForm/>} />
        <Route path="/csvdata" element={<CsvTable/>} />
        <Route path="/addsdnt" element={<AddStudentForm/>} />
        <Route path="/buttons" element={<Buttons/>} />
        <Route path="/person" element={<PersonForm/>} />
        <Route path="/page" element={<Page/>} /> 
    </Routes>
  );
}

export default App;
