import { useFindAllWarehouseQuery } from "../api/warehouseApi";

function WarehouseList() {
  const { data: warehouses, refetch } = useFindAllWarehouseQuery();

  return (
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
  );
}

export default WarehouseList;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import "./WarehouseList.css";

// const WarehouseList = () => {
//     const [warehouses, setWarehouses] = useState([]);
//     const [errorMessage, setErrorMessage] = useState("");
    
//     useEffect(() => {
//       loadWarehouses();
//     }, []);
  
//     const loadWarehouses = async () => {
//       try {
//         const result = await axios.get("http://localhost:9000/warehouses");
//         setWarehouses(result.data);
//         setErrorMessage("");
//       } catch (error) {
//         setErrorMessage("An error occurred while loading the warehouses.");
//       }
//     };
  
//     // other functions for deleting, editing, and adding warehouses
//     // ...
  
//     return (
//       <div className="container">
//         {errorMessage && (
//           <div className="alert alert-danger" role="alert">
//             {errorMessage}
//           </div>
//         )}
//         <div className="card">
//           <div className="card-header">
//             <h2>Warehouse List</h2>
//           </div>
//           <div className="card-body">
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Address</th>
//                   <th>Contact Person</th>
//                   <th>Phone Number</th>
//                   <th>Max Capacity</th>
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {warehouses.map((warehouse) => (
//                   <tr key={warehouse.id}>
//                     <td>{warehouse.name}</td>
//                     <td>{warehouse.address}</td>
//                     <td>{warehouse.contactPerson}</td>
//                     <td>{warehouse.phoneNumber}</td>
//                     <td>{warehouse.maxCapacity}</td>
//                     <td>
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => deleteWarehouse(warehouse.id)}
//                       >
//                         Delete
//                       </button>
//                       <button
//                         className="btn btn-primary"
//                         onClick={() => editWarehouseRow(warehouse)}
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default WarehouseList;