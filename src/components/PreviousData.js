import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Navbar from './Navbar';
import Footer from './Footer';

function CsvTable() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    // Define the path to your CSV file
    const csvFilePath = '/data.csv';

    // Parse the CSV file using PapaParse
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: (results) => {
        // Extract the headers and data from the parsed CSV
        setHeaders(results.meta.fields);
        setData(results.data);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  }, []);

  const body = {
    height: '100vh',
    background: '#c5d1df',
  };
  

  // Define CSS styles as JavaScript objects
  const tableContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '75%',
    marginBottom: '100px',
  };

  const cellStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'center',
  };

  const evenRowStyle = {
    backgroundColor: '#f2f2f2',
  };

  const oddRowStyle = {
    backgroundColor: '#fff',
  };

  return (
    <div style={body}>
    <Navbar/>
    <div style={tableContainerStyle}>
      <h1>Current Attendance</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th style={cellStyle} key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr style={index % 2 === 0 ? evenRowStyle : oddRowStyle} key={index}>
              {headers.map((header, idx) => (
                <td style={cellStyle} key={idx}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </div>
  );
}

export default CsvTable;
