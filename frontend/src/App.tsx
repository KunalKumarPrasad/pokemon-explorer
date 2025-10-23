import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import { PokemonListItem } from './interfaces';

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [offset, setOffset] = useState(0);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PokemonList
              pokemons={pokemons}
              setPokemons={setPokemons}
              offset={offset}
              setOffset={setOffset}
            />
          }
        />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
