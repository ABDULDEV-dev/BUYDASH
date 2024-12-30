import React, { useState, useEffect } from 'react';
import './InventoryManagementSystem.css';
import Header from'./Header'

//let name =  prompt("WHAT IS YOUR NAME");

//alert("Hello" + " " + name);


function InventoryManagementSystem() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: 0,
    price: ''
  });

  // Load inventory from local storage on initial render
  useEffect(() => {
    const savedInventory = localStorage.getItem('inventoryData');
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
  }, []);

  // Save inventory to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('inventoryData', JSON.stringify(inventory));
  }, [inventory]);

  // Add new inventory item
  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.category) {
      alert('Please fill in all fields');
      return;
    }

    const itemToAdd = {
      id: `item-${Date.now()}`,
      ...newItem,
      lastUpdated: new Date()
    };

    setInventory([...inventory, itemToAdd]);
    
    // Reset form
    setNewItem({
      name: '',
      category: '',
      quantity: 0,
      price: 0
    });
  };

  // Update item quantity
  const updateQuantity = (id, change) => {
    setInventory(inventory.map(item => 
      item.id === id 
        ? { 
            ...item, 
            quantity: Math.max(0, item.quantity + change),
            lastUpdated: new Date()
          }
        : item
    ));
  };

  // Delete item
  const deleteItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  return (
    <div className="inventory-container">
      <Header />
      <div className="inventory-form-section">
        <h2>Inventory Management System</h2>
        <form onSubmit={addItem} className="inventory-form">
          <input 
            type="text"
            placeholder="Item Name" 
            value={newItem.name}
            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
            required
          />
          <input 
            type="text"
            placeholder="Category" 
            value={newItem.category}
            onChange={(e) => setNewItem({...newItem, category: e.target.value})}
            required
          />
          <input 
            type="number" 
            placeholder="Quantity" 
            value={newItem.quantity}
            onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value)})}
            required
          />
          <input 
            type="text" 
            placeholder="Price" 
            value={newItem.price}
            onChange={(e) => setNewItem({...newItem, price: e.target.value})}
            required
          />
          <button type="submit">Add Item</button>
        </form>
      </div>

      <div className="inventory-list-section">
        <h2>Current Inventory</h2>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>DATE</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </td>
                <td>₦ {item.price}</td>
                <td>{item.lastUpdated.toLocaleDateString()}</td>
                <td>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryManagementSystem