import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req: express.Request, res: express.Response) => {
  res.send({
    ok: true,
    endpoints: ['/signIn']
  });
});

app.get('/signIn', (_req: express.Request, res: express.Response) => {
  res.send({
    token: 'token123'
  })
});

app.post('/signIn', (_req: express.Request, res: express.Response) => {
  res.send({
    token: 'token123'
  });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080'));
