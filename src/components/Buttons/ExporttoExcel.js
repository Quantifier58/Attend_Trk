import React, { useRef, useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const ExportToExcelButton = () => {
  const componentRef = useRef();
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    // Fetch data from "text.json"
    const fetchData = async () => {
      try {
        const response = await fetch('/text.json');
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'data.xlsx');
  };

  return (
    <div style={{ position: 'fixed', top: '60%', right: '20%' }}>
      <button
        onClick={handleExportToExcel}
        style={{
          backgroundColor: 'green',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '17px',
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Export to Excel
      </button>
      <ComponentToPrint ref={componentRef} data={jsonData} />
    </div>
  );
};

// Define the component to be printed
const ComponentToPrint = React.forwardRef(({ data }, ref) => (
  <div ref={ref}>
    <ul>
      {data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
));

export default ExportToExcelButton;
