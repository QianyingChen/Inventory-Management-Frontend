import { useState, useRef } from "react";
import {
  useCreateWarehouseMutation,
  useDeleteWarehouseMutation,
  useFindAllWarehouseQuery,
  useUpdateWarehouseMutation,
} from "./api/warehouseApi";

import { Warehouse } from "./components/Warehouse";

function App() {
  const { data: warehouses, refetch } = useFindAllWarehouseQuery();
  const [createWarehouse] = useCreateWarehouseMutation();
  const [updateWarehouse] = useUpdateWarehouseMutation();
  const [deleteWarehouse] = useDeleteWarehouseMutation();

  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const contactPersonRef = useRef(null);
  const capacityRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newWarehouse = {
      name: nameRef?.current?.value,
      address: addressRef?.current?.value,
      phoneNumber: phoneNumberRef?.current?.value,
      contactPerson: contactPersonRef?.current?.value,
      maxCapacity: Number(capacityRef?.current?.value),
    };

    createWarehouse(newWarehouse)
      .unwrap()
      .then(() => {
        refetch();
        nameRef.current.value = "";
        addressRef.current.value = "";
        phoneNumberRef.current.value = "";
        contactPersonRef.current.value = "";
        capacityRef.current.value = "";
      });
  };

  const handleDelete = (id) => {
    deleteWarehouse(id)
      .unwrap()
      .then(() => refetch());
  };

  const handleUpdate = (id, updatedWarehouse) => {
    updateWarehouse({ id, ...updatedWarehouse })
      .unwrap()
      .then(() => refetch());
  };

  return (
    <div className="App">
      <h1>Warehouse Management System</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" ref={nameRef} required />
        </label>
        <label>
          Address:
          <input type="text" ref={addressRef} required />
        </label>
        <label>
          Phone Number:
          <input type="text" ref={phoneNumberRef} required />
        </label>
        <label>
          Contact Person:
          <input type="text" ref={contactPersonRef} required />
        </label>
        <label>
          Capacity:
          <input type="number" ref={capacityRef} required />
        </label>
        <button type="submit">Add Warehouse</button>
      </form>
      <div className="warehouses-container">
        {warehouses &&
          warehouses.map((warehouse) => (
            <Warehouse
              key={warehouse.id}
              warehouse={warehouse}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
