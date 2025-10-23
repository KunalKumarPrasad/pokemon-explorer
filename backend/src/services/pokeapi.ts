import axios from 'axios';
import { POKEAPI_BASE_URL, DEFAULT_LIMIT } from '../constants/constants';
import { PokemonDetail, PokemonListItem } from '../interfaces';
import { formatPokemonDetails } from '../utils/formatPokemonDetails';

export const getPokemonList = async (
  limit: number = DEFAULT_LIMIT,
  offset: number = 0
): Promise<{ name: string; url: string }[]> => {
  const res = await axios.get(`${POKEAPI_BASE_URL}?limit=${limit}&offset=${offset}`);
  return res.data.results;
};

export const getPokemonDetail = async (name: string): Promise<PokemonDetail> => {
  const res = await axios.get(`${POKEAPI_BASE_URL}/${name}`);
  const { height, weight, abilities, types, sprites } = res.data;

  const image =
    sprites.other?.dream_world?.front_default || sprites.front_default || '';

  const detail: PokemonDetail = {
    name,
    height,
    weight,
    abilities,
    types,
    image,
  };

  return formatPokemonDetails(detail);
};

export const getPokemonListWithImages = async (
  limit: number = DEFAULT_LIMIT,
  offset: number = 0
): Promise<PokemonListItem[]> => {
  const list = await getPokemonList(limit, offset);

  const detailedList = await Promise.all(
    list.map(async (p) => {
      const idMatch = p.url.match(/\/pokemon\/(\d+)\//);
      if (idMatch) {
        const id = idMatch[1];
        return { name: p.name, image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg` };
      } else {
        const detail = await axios.get(p.url);
        return {
          name: p.name,
          image: detail.data.sprites.other?.dream_world?.front_default || detail.data.sprites.front_default || '',
        };
      }
    })
  );

  return detailedList;
};
