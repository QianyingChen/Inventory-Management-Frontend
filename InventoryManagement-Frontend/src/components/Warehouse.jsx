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
  // const handleDelete = (id) => {
  //  deleteWarehouse(id);
  // };
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Warehouse.css";

// const Warehouse = () => {
//   const [warehouses, setWarehouses] = useState([]);
//   const [warehouse, setWarehouse] = useState({
//     id: "",
//     name: "",
//     address: "",
//     contactPerson: "",
//     phoneNumber: "",
//     maxCapacity: "",
//   });
//   const [editWarehouse, setEditWarehouse] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(""); // new error message state

//   useEffect(() => {
//     loadWarehouses();
//   }, []);

//   const loadWarehouses = async () => {
//     try {
//       const result = await axios.get("http://localhost:9000/warehouses");
//       setWarehouses(result.data);
//       setErrorMessage(""); // reset error message if successful
//     } catch (error) {
//       setErrorMessage("An error occurred while loading the warehouses.");
//     }
//   };

//   const deleteWarehouse = async (id) => {
//     try {
//       await axios.delete(`http://localhost:9000/warehouses/${id}`);
//       loadWarehouses();
//     } catch (error) {
//       setErrorMessage("An error occurred while deleting the warehouse.");
//     }
//   };

//   const addWarehouse = async () => {
//     try {
//       await axios.post("http://localhost:9000/warehouses", warehouse);
//       loadWarehouses();
//     } catch (error) {
//       setErrorMessage("An error occurred while adding the warehouse.");
//     }
//   };

//   const updateWarehouse = async () => {
//     try {
//       await axios.put(`http://localhost:9000/warehouses/${warehouse.id}`, warehouse);
//       loadWarehouses();
//     } catch (error) {
//       setErrorMessage("An error occurred while updating the warehouse.");
//     }
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (editWarehouse) {
//       updateWarehouse();
//     } else {
//       addWarehouse();
//     }
//     setWarehouse({
//       id: "",
//       name: "",
//       address: "",
//       contactPerson: "",
//       phoneNumber: "",
//       maxCapacity: "",
//     });
//     setEditWarehouse(false);
//   };

//   const editWarehouseRow = (warehouse) => {
//     setEditWarehouse(true);
//     setWarehouse(warehouse);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setWarehouse({ ...warehouse, [name]: value });
//   };

//   return (
//     <div className="container">
//       {errorMessage && ( // render error message if it exists
//         <div className="alert alert-danger" role="alert">
//           {errorMessage}
//         </div>
//       )}
//       <div className="card">
//         <div className="card-header">
//           <h2>Warehouse Management System</h2>
//         </div>
//         <div className="card-body">
//           <div className="row">
//             <div className="col-md-4">
//               <h3>Add Warehouse</h3>
//               <form onSubmit={onSubmit}>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter name"
//                     name="name"
//                     value={warehouse.name}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter address"
//                     name="address"
//                     value={warehouse.address}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter contact person"
//                     name="contactPerson"
//                     value={warehouse.contactPerson}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter phone number"
//                     name="phoneNumber"
//                     value={warehouse.phoneNumber}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="number"
//                     className="form-control"
//                     placeholder="Enter max capacity"
//                     name="maxCapacity"
//                     value={warehouse.maxCapacity}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                   Add Warehouse
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
  
//   }
// export default Warehouse;
