"use client";

import { usePokemonDetail, usePokemonList } from "@/hooks/use-pokemon";
import { getPokemonImageUrl } from "@/lib/api/pokemon-api";
import Image from "next/image";
import LoadingSpinner from "./custom/loading-spinner";

const TOTAL_POKEMON = 151;
export default function MainContent() {
  const { pokemonList, isLoading, isError } = usePokemonList(0, TOTAL_POKEMON);

  const { pokemon } = usePokemonDetail("bulbasaur");

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!pokemon) return null;

  console.log(pokemonList);
  console.log("pokemon", pokemon);

  return (
    <main className="container mx-auto px-4 py-8">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum vitae
      voluptates fugiat nisi repellendus. Sapiente iure ipsa, odit provident,
      nesciunt aut at itaque voluptatum quidem delectus expedita rem eaque ab.
      <Image
        src={getPokemonImageUrl(pokemon.id)}
        alt="pokemon"
        width={200}
        height={200}
        loading="eager"
        priority
      />
    </main>
  );
}
