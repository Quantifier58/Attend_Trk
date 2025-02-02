import React, { useState } from 'react';
import Modal from 'react-modal';

const FilterButton = ({ onFilter }) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterData, setFilterData] = useState({/* Define initial filter values */});

  const handleFilterClick = () => {
    setIsFilterModalOpen(true);
  };

  const handleFilterClose = () => {
    setIsFilterModalOpen(false);
  };

  const handleFilter = () => {
    // Perform filtering logic using filterData
    // Update the logic based on your requirements
    onFilter(filterData);
    handleFilterClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <button onClick={handleFilterClick}>Filter</button>
      <Modal isOpen={isFilterModalOpen} onRequestClose={handleFilterClose}>
        <div>
          <h2>Filter Data</h2>
          {/* Add input fields for filtering */}
          <label>
            Field 1:
            <input type="text" name="field1" value={filterData.field1 || ''} onChange={handleInputChange} />
          </label>
          {/* Add more input fields as needed */}
          <button onClick={handleFilter}>Apply Filter</button>
        </div>
      </Modal>
    </div>
  );
};

export default FilterButton;
