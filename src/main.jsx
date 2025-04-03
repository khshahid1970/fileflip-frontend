import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ This connects to your real App.jsx

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
