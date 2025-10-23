import express from 'express';
import cors from 'cors';
import pokemonRouter from './routes/Pokemon';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/pokemon', pokemonRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
