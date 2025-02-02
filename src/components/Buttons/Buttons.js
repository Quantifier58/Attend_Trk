import React from 'react';
import DownloadPDFButton from './Downloadpdf';
import ExportToExcelButton from './ExporttoExcel';
import FilterButton from './Filter';
import NewStockButton from './NewStock';

const Buttons = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ marginRight: '10px' }}>
        <DownloadPDFButton />
      </div>
      <div>
        <ExportToExcelButton />
      </div>
      <div>
        <FilterButton/>
      </div>
      <div>
        <NewStockButton/>
      </div>
    </div>
  );
}

export default Buttons;
