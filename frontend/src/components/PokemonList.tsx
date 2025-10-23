import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PokemonListItem } from '../interfaces';

interface Props {
  pokemons: PokemonListItem[];
  setPokemons: React.Dispatch<React.SetStateAction<PokemonListItem[]>>;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

const PokemonList: React.FC<Props> = ({ pokemons, setPokemons, offset, setOffset }) => {
  const [loading, setLoading] = useState(false);

  const loadPokemons = async (append: boolean = false) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/pokemon?offset=${offset}`);
      setPokemons(prev => (append ? [...prev, ...res.data.pokemons] : res.data.pokemons));
      setOffset(res.data.nextOffset);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pokemons.length === 0) loadPokemons(false);
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Pokémon Explorer</h1>
      <div className="row">
        {pokemons.map(p => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={p.name}>
            <div className="card h-100 text-center shadow-sm">
              <img
                src={p.image}
                className="card-img-top mx-auto mt-3"
                alt={p.name}
                style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                loading="lazy"
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title text-capitalize">{p.name}</h5>
                <Link to={`/pokemon/${p.name}`} className="btn btn-primary btn-sm mt-2">
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center my-4">
        <button className="btn btn-secondary" onClick={() => loadPokemons(true)} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
