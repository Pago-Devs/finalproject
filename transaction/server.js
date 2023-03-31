import app from './src/app.js';

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
