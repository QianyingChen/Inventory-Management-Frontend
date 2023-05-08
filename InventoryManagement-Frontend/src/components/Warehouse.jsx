import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { warehouseApi  } from "../api/warehouseApi";



export const Warehouse = ({ warehouse }) => {
  const dispatch = useDispatch();

  // This state determines if it is in edit mode or not
  const [isEdit, setIsEdit] = useState(false);
  // These states will be used to update the warehouse
  const [inputName, setInputName] = useState(warehouse.name);
  const [inputAddress, setInputAddress] = useState(warehouse.address);
  const [inputContactPerson, setInputContactPerson] = useState(
    warehouse.contactPerson
  );
  const [inputPhoneNumber, setInputPhoneNumber] = useState(
    warehouse.phoneNumber
  );
  const [inputMaxCapacity, setInputMaxCapacity] = useState(
    warehouse.maxCapacity
  );

  const handleDelete = (id) => {
    dispatch(deleteWarehouse(id));
  };

  const handleUpdate = () => {
    // Create an object with the updated values
    const updatedWarehouse = {
      id: warehouse.id,
      name: inputName,
      address: inputAddress,
      contactPerson: inputContactPerson,
      phoneNumber: inputPhoneNumber,
      maxCapacity: inputMaxCapacity,
    };
    // Dispatch the update action with the updated object
    dispatch(updateWarehouse(updatedWarehouse));
    // Exit edit mode
    setIsEdit(false);
  };

  if (isEdit) {
    return (
      <div className="container">
        <input value={inputName} onChange={(e) => setInputName(e.target.value)} />
        <input value={inputAddress} onChange={(e) => setInputAddress(e.target.value)} />
        <input
          value={inputContactPerson}
          onChange={(e) => setInputContactPerson(e.target.value)}
        />
        <input
          value={inputPhoneNumber}
          onChange={(e) => setInputPhoneNumber(e.target.value)}
        />
        <input
          value={inputMaxCapacity}
          onChange={(e) => setInputMaxCapacity(e.target.value)}
        />
        <button onClick={() => setIsEdit(false)}>Cancel Edit Mode</button>
        <button onClick={handleUpdate}>Update</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>{warehouse.name}</h2>
      <h3>{warehouse.address}</h3>
      <h4>{warehouse.contactPerson}</h4>
      <h4>{warehouse.phoneNumber}</h4>
      <h4>{warehouse.maxCapacity}</h4>
      {/* In order to handleDelete with a parameter, use function currying */}
      <button onClick={() => setIsEdit(true)}>Edit</button>
      <button onClick={() => handleDelete(warehouse.id)}>Delete</button>
    </div>
  );
};

