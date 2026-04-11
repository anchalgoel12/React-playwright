import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send({
    ok: true,
    endpoints: ['/signIn']
  });
});

app.get('/signIn', (req, res) => {
  res.send({
    token: 'token123'
  })
});

app.post('/signIn', (_req, res) => {
  res.send({
    token: 'token123'
  });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080'));
