import React, { useState } from 'react';
import Modal from 'react-modal';

const NewStockButton = ({ onAddNewItem }) => {
  const [isNewStockModalOpen, setIsNewStockModalOpen] = useState(false);
  const [newItem, setNewItem] = useState('');

  const handleNewStockClick = () => {
    setIsNewStockModalOpen(true);
  };

  const handleNewStockClose = () => {
    setIsNewStockModalOpen(false);
    setNewItem(''); // Clear the input when the modal is closed
  };

  const handleAddNewItem = () => {
    // Perform logic to add the new item
    // Update the logic based on your requirements
    onAddNewItem(newItem);
    handleNewStockClose();
  };

  const handleInputChange = (e) => {
    setNewItem(e.target.value);
  };

  return (
    <div>
      <button onClick={handleNewStockClick}>New Stock</button>
      <Modal isOpen={isNewStockModalOpen} onRequestClose={handleNewStockClose}>
        <div>
          <h2>Add New Item</h2>
          <label>
            New Item:
            <input type="text" value={newItem} onChange={handleInputChange} />
          </label>
          <button onClick={handleAddNewItem}>Add Item</button>
        </div>
      </Modal>
    </div>
  );
};

export default NewStockButton;
