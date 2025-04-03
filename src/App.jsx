import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [conversionType, setConversionType] = useState('');
  const [message, setMessage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !conversionType) {
      setMessage('Please select a file and conversion type.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('conversion_type', conversionType);

    setMessage('Converting file...');

    try {
      const response = await fetch('https://fileflip-backend.onrender.com/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Conversion failed.');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      setMessage('Conversion successful!');
    } catch (err) {
      setMessage('Conversion failed. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h1>Welcome to FileFlip!</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <br /><br />
        <select value={conversionType} onChange={(e) => setConversionType(e.target.value)}>
          <option value="">Select conversion type</option>
          <option value="pdf-to-word">PDF to Word</option>
          <option value="txt-to-pdf">Text to PDF</option>
          <option value="jpg-to-pdf">JPG to PDF</option>
          <option value="pdf-to-jpg">PDF to JPG</option>
        </select>
        <br /><br />
        <button type="submit">Convert</button>
      </form>
      <p>{message}</p>
      {downloadUrl && (
        <a href={downloadUrl} download>
          <button>Download File</button>
        </a>
      )}
    </div>
  );
}

export default App;

