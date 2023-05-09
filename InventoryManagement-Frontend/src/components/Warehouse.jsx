import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useCreateWarehouseMutation, useDeleteWarehouseMutation, useFindAllWarehouseQuery, useUpdateWarehouseMutation } from "../api/warehouseApi";
import "./Warehouse.css";

export const Warehouse = ({ warehouse, handleDelete, refetch }) => {
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

  const [updateWarehouse] = useUpdateWarehouseMutation();
  const [deleteWarehouse] = useDeleteWarehouseMutation();

  <button className="warehouse-delete-button" onClick={() => handleDelete(warehouse.id)}>
  Delete
</button>

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
    
  updateWarehouse(updatedWarehouse).unwrap().then(() => refetch());  ;
    // Exit edit mode
    setIsEdit(false);
  };

  if (isEdit) {
    return (
      <div className="warehouse-container">
        <div className="warehouse-field-container">
          <label className="warehouse-field-label">Name:</label>
          <input
            className="warehouse-input-field"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        </div>
        <div className="warehouse-field-container">
          <label className="warehouse-field-label">Address:</label>
          <input
            className="warehouse-input-field"
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
          />
        </div>
        <div className="warehouse-field-container">
          <label className="warehouse-field-label">Contact Person:</label>
          <input
            className="warehouse-input-field"
            value={inputContactPerson}
            onChange={(e) => setInputContactPerson(e.target.value)}
          />
        </div>
        <div className="warehouse-field-container">
          <label className="warehouse-field-label">Phone Number:</label>
          <input
            className="warehouse-input-field"
            value={inputPhoneNumber}
            onChange={(e) => setInputPhoneNumber(e.target.value)}
          />
        </div>
        <div className="warehouse-field-container">
          <label className="warehouse-field-label">Max Capacity:</label>
          <input
            className="warehouse-input-field"
            value={inputMaxCapacity}
            onChange={(e) => setInputMaxCapacity(e.target.value)}
          />
        </div>
        <button className="warehouse-submit-button" onClick={handleUpdate}>
          Save Changes
        </button>
        <button className="warehouse-cancel-button" onClick={() => setIsEdit(false)}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <tr key={warehouse.id}>
      <td>{warehouse.name}</td>
      <td>{warehouse.address}</td>
      <td>{warehouse.contactPerson}</td>
      <td>{warehouse.phoneNumber}</td>
      <td>{warehouse.maxCapacity}</td>
      <td>
        <button className="warehouse-edit-button" onClick={() => setIsEdit(true)}>
          Edit
        </button>
        <button className="warehouse-delete-button" onClick={() => handleDelete(warehouse.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
  }  

