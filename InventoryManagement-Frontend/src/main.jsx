import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App'
import warehouse from './store'
import store from './store'


/**
 * Put in Redux:
 * - Application State
 *   - Globally used variables (think user object/details)
 * - Server State
 *   - Fetch data from an API, store in Redux
 * 
 * Do not put in Redux:
 * - Component State
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider  store={store}>
      {/* Anything within this provider can read/write to the store */}
      <App />
    </Provider>
    
  </React.StrictMode>,
)


