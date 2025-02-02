import React, { useState } from 'react';
import './add.css';
import Navbar from '../Navbar';
import Footer from '../Footer';

const AddStudentForm = ({ onAddStudent }) => {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRollNoChange = (e) => {
    setRollNo(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !rollNo) {
      alert('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('rollNo', rollNo);
    formData.append('photo', photo);

    try {
      const response = await fetch('http://localhost:3001/addStudent', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Data added successfully');
        onAddStudent({ name, rollNo });

        // Reset the form fields after submission
        setName('');
        setRollNo('');
        setPhoto(null);
      } else {
        console.error('Failed to add data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-student-form">
        <h2>Add Student</h2>
        <h3>Details:</h3>
        <form onSubmit={handleSubmit}>
          <div className='addForm'>
          <div className='labels'>
            <label>Name:</label>
            <br />
            <label>Roll No:</label>
            <br />
            <label>Photo:</label>
          </div>
          <div className='inputarea'>
            <input type="text" value={name} onChange={handleNameChange} />
            <input type="text" value={rollNo} onChange={handleRollNoChange} />
            <input  className="photoupload" type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>
          </div>
          <br />
        <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddStudentForm;
