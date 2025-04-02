import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Connecting to backend...');

  useEffect(() => {
    fetch('https://fileflip-backend.onrender.com/')
      .then(res => res.json())
      .then(data => setMessage(data.message || 'Connected!'))
      .catch(err => {
        console.error("Error:", err);
        setMessage('❌ Error connecting to backend.');
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h1>Welcome to FileFlip!</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
