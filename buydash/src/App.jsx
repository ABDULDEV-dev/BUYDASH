import React, { useState, useEffect } from 'react';

// Inventory Item Type
interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  lastUpdated: Date;
}

const InventoryManagementSystem = () => {
  // State management
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: 0,
    price: 0
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
  const addItem = () => {
    if (!newItem.name || !newItem.category) {
      alert('Please fill in all fields');
      return;
    }

    const itemToAdd: InventoryItem = {
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
  const updateQuantity = (id: string, change: number) => {
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
  const deleteItem = (id: string) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg mb-6">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Inventory Management System</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input 
              type="text"
              placeholder="Item Name" 
              className="w-full p-2 border rounded"
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
            />
            <input 
              type="text"
              placeholder="Category" 
              className="w-full p-2 border rounded"
              value={newItem.category}
              onChange={(e) => setNewItem({...newItem, category: e.target.value})}
            />
            <input 
              type="number" 
              placeholder="Quantity" 
              className="w-full p-2 border rounded"
              value={newItem.quantity}
              onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
            />
            <input 
              type="number" 
              placeholder="Price" 
              className="w-full p-2 border rounded"
              value={newItem.price}
              onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value) || 0})}
            />
            <button 
              onClick={addItem} 
              className="w-full col-span-1 md:col-span-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Add Item
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Current Inventory</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Last Updated</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.category}</td>
                  <td className="p-2 border">
                    <div className="flex items-center justify-center">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-gray-200 px-2 rounded-l hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-gray-200 px-2 rounded-r hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-2 border">${item.price.toFixed(2)}</td>
                  <td className="p-2 border">
                    {item.lastUpdated.toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    <button 
                      onClick={() => deleteItem(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
    </div>
  );
};






export default App
