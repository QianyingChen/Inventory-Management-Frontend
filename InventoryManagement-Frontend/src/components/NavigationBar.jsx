import React from 'react';

function NavigationBar() {
  return (
    <div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/warehouse">Warehouses</a></li>
        <li><a href="/transactions">Transactions</a></li>
      </ul>
    </div>
  );
}

export default NavigationBar;
