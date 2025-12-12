import {
  PokemonDetail,
  PokemonDetailSchema,
  PokemonListResponse,
  PokemonListResponseSchema,
} from "../schemas/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(
  offset = 0,
  limit = 20
): Promise<PokemonListResponse> {
  const response = await fetch(
    `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  try {
    const data = await response.json();
    return PokemonListResponseSchema.parse(data);
  } catch (err) {
    throw new Error(`Failed to fetch Pokemon list: ${err}`);
  }
}

export async function fetchPokemonDetail(
  nameOrId: string | number
): Promise<PokemonDetail> {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon detail: ${response.status}`);
  }

  const data = await response.json();
  return PokemonDetailSchema.parse(data);
}

export async function fetchAllPokemonNames(): Promise<PokemonListResponse> {
  const response = await fetch(`${BASE_URL}/pokemon?limit=1500`);

  if (!response.ok) {
    throw new Error(`Failed to fetch all Pokemon names: ${response.status}`);
  }

  const data = await response.json();
  return PokemonListResponseSchema.parse(data);
}

export function getPokemonIdFromUrl(url: string): number {
  const matches = url.match(/\/pokemon\/(\d+)\//);
  return matches ? Number.parseInt(matches[1], 10) : 0;
}

export function getPokemonImageUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
