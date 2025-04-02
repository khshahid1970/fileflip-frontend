import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Connecting...');

  useEffect(() => {
    const fetchBackend = async () => {
      try {
        // wait 2 seconds in case backend is waking up
        await new Promise(resolve => setTimeout(resolve, 2000));

        const response = await fetch('https://fileflip-backend.onrender.com/');
        const data = await response.json();

        if (data.message) {
          setMessage(data.message);
        } else {
          setMessage('Connected, but unexpected response!');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setMessage('❌ Failed to connect to backend.');
      }
    };

    fetchBackend();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h1>Welcome to FileFlip!</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
