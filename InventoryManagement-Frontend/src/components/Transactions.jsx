import React, { useState, useEffect } from 'react';

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Warehouse ID</th>
            <th>Item ID</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.type}</td>
              <td>{transaction.warehouseId}</td>
              <td>{transaction.itemId}</td>
              <td>{transaction.quantity}</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
