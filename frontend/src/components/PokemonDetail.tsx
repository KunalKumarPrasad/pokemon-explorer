import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Ability {
  ability: { name: string };
}

interface Type {
  type: { name: string };
}

interface PokemonDetailProps {
  name: string;
  image: string;
  types: Type[];
  height: number;
  weight: number;
  abilities: Ability[];
}

const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetailProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!name) return;
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/pokemon/${name}`);
        setPokemon(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [name]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!pokemon) return <div className="text-center mt-5">Pokémon not found</div>;

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-secondary mb-4">
        ← Back to List
      </Link>
      <div className="card mx-auto shadow-sm" style={{ maxWidth: '400px' }}>
        <img
          src={pokemon.image}
          className="card-img-top mx-auto mt-3"
          alt={pokemon.name}
          style={{ width: '200px', height: '200px', objectFit: 'contain' }}
        />
        <div className="card-body">
          <h2 className="card-title text-center text-capitalize">{pokemon.name}</h2>
          <hr />
          <p>
            <strong>Type(s):</strong> {pokemon.types.map(t => t.type.name).join(', ')}
          </p>
          <p>
            <strong>Height:</strong> {pokemon.height} decimetres
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight} hectograms
          </p>
          <p>
            <strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
