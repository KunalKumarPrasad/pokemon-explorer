import express from 'express';
import { getPokemonListWithImages, getPokemonDetail } from '../services/pokeapi';
import { DEFAULT_LIMIT } from '../constants/constants';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : DEFAULT_LIMIT;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

    const data = await getPokemonListWithImages(limit, offset);

    res.json({ pokemons: data, nextOffset: offset + limit });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching Pokémon list', error: err });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const data = await getPokemonDetail(name);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching Pokémon details', error: err });
  }
});

export default router;
