const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4001;

// This will allow the frontend to access endpoints from different hostname (since backend and frontend are running on different ports)
app.use(cors()); 

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Express backend!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
  