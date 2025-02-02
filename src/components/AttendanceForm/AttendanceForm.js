import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { BiRefresh } from 'react-icons/bi'
import './AttendanceForm.css'; // Import the CSS styles

const AttendanceForm = () => {
  const [date, setDate] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setPhoto(uploadedFile);
  };

  const handleSubmit = async () => {
    if (!date || !photo) {
      alert('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('date', date);
    formData.append('photo', photo);

    try {
      const response = await fetch('http://localhost:3002/attendance', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Attendance marked successfully');
        // Handle success as needed
      } else {
        console.error('Failed to mark attendance');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='body'>
      <Navbar />
      <div className="attendance-form-container">
        <h2 className="h2-style">Mark Attendance</h2>
        <h3 className="h3-style">CS 203 Course</h3>

        <div className="content-container">
          <div className="label-container">
            <label className="label-style">Date:</label>
            <label className="label-style">Photo:</label>
          </div>

          <div className="input-container">
            <input type="date" value={date} onChange={handleDateChange} className="input-style" />
            <div className="input-style">
              <input
                type="file"
                onChange={handleFileUpload}
                id="fileInput"
              />
            </div>
          </div>
        </div>
        <label className="button-style" onClick={handleSubmit}>Submit</label>
        <button
          className="refresh-button-style"
          title="Refresh Previous Data"
        >
          <BiRefresh className="github-icon-style" />
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default AttendanceForm;
