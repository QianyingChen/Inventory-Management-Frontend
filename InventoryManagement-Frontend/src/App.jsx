import { useState, useRef } from "react";
import {
  useCreateWarehouseMutation,
  useDeleteWarehouseMutation,
  useFindAllWarehouseQuery,
  useUpdateWarehouseMutation,
} from "./api/warehouseApi";
import { useSelector, useDispatch } from 'react-redux';
import { Warehouse } from "./components/Warehouse";
import WarehouseList from "./components/WarehouseList";
import MiniVariantDrawer from "./components/MiniVariantDrawer";
import './App.css'


function App() {
  const dispatch = useDispatch();
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
    <>

   <MiniVariantDrawer />
   <WarehouseList />

    
    {/* <WarehouseComponent /> */}
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
          Max Capacity:
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
              refetch={refetch}
            />
            
          ))}
      </div>
    </div>
    </>
  );
}

export default App;