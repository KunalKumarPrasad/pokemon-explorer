export interface Ability {
  ability: {
    name: string;
  };
}

export interface Type {
  type: {
    name: string;
  };
}

export interface PokemonDetail {
  name: string;
  image: string;
  types: Type[];
  height: number;
  weight: number;
  abilities: Ability[];
}

export interface PokemonListItem {
  name: string;
  image: string;
}