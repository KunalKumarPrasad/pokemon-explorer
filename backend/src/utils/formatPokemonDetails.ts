import { PokemonDetail } from "../interfaces";

export const capitalizeFirstChar = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const formatPokemonDetails = (data:PokemonDetail) => {
  const result = { ...data };

  if (result.name) result.name = capitalizeFirstChar(result.name);

  if (result.types && Array.isArray(result.types)) {
    result.types = result.types.map((t: any) => ({
      type: { name: capitalizeFirstChar(t.type.name) }
    }));
  }

  if (result.abilities && Array.isArray(result.abilities)) {
    result.abilities = result.abilities.map((a: any) => ({
      ability: { name: capitalizeFirstChar(a.ability.name) }
    }));
  }

  return result;
};
