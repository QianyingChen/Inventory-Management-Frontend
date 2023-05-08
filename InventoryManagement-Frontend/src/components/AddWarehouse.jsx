import React, { useState } from 'react';
import axios from 'axios';

function AddWarehouse(props) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name, location, capacity };
    axios.post('http://localhost:8080/warehouses', data)
      .then(response => {
        props.onAddWarehouse(response.data);
        setName('');
        setLocation('');
        setCapacity('');
      })
      .catch(error => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Warehouse</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} required />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" value={location} onChange={(event) => setLocation(event.target.value)} required />
      </div>
      <div>
        <label htmlFor="capacity">Capacity:</label>
        <input type="number" id="capacity" value={capacity} onChange={(event) => setCapacity(event.target.value)} required />
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddWarehouse;