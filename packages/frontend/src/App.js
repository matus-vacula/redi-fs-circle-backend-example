import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMessage = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/message');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching message:', error);
      setMessage('Failed to load message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>React + Express Demo</h1>
      <button onClick={fetchMessage} disabled={loading}>
        {loading ? 'Loading...' : 'Load Message'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
