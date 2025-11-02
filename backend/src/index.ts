import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/api/users', (req: Request, res: Response) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];
  res.json(users);
});

app.post('/api/users', (req: Request, res: Response) => {
  const { name, email } = req.body;
  const newUser = {
    id: Date.now(),
    name,
    email,
  };
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
