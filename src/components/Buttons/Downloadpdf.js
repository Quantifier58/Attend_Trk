import React, { useRef, useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { useReactToPrint } from 'react-to-print';

const DownloadPDFButton = () => {
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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownloadPDF = () => {
    handlePrint();
  };

  return (
    <div style={{ position: 'fixed', top: '30%', right: '20%' }}>
      <button
        onClick={handleDownloadPDF}
        style={{
          backgroundColor: 'purple',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '17px',
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Download PDF
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

export default DownloadPDFButton;
