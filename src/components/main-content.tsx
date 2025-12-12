"use client";

import LoadingSpinner from "./custom/loading-spinner";
import { notFound } from "next/navigation";
import { SearchBar } from "./custom/search-bar";
import { useAllPokemonNames, usePokemonList } from "@/hooks/use-pokemon";
import { useMemo, useState } from "react";
import { Pagination } from "./custom/pagination";
import { PokemonCard } from "./custom/pokemon-card";
import { ModalPokeDetail } from "./modals/modal-poke-detail";

const ITEMS_PER_PAGE = 20;
export default function MainContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const {
    pokemonList,
    isLoading,
    error: errorPokemonList,
  } = usePokemonList(offset, ITEMS_PER_PAGE);

  const {
    pokemonListBySearch,
    totalCount,
    error: errorPokemonListBySearch,
  } = useAllPokemonNames();

  if (errorPokemonList || errorPokemonListBySearch) {
    console.error(errorPokemonList, errorPokemonListBySearch);
    notFound();
  }

  const displayedPokemon = useMemo(() => {
    if (searchQuery.trim()) {
      return pokemonListBySearch
        .filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 100);
    }
    return pokemonList?.results || [];
  }, [searchQuery, pokemonListBySearch, pokemonList]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const totalPages = pokemonList?.count
    ? Math.ceil(pokemonList.count / ITEMS_PER_PAGE)
    : 1;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <SearchBar onSearch={handleSearch} defaultValue={searchQuery} />
          {pokemonList && (
            <p className="text-sm text-muted-foreground">
              {searchQuery
                ? `Found ${displayedPokemon.length} Pokemon`
                : `Page ${currentPage} of ${totalPages} • Total: ${totalCount} Pokemon`}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {displayedPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
              onClick={() => {
                setSelectedPokemon(pokemon.name);
                setIsModalDetailOpen(true);
              }}
            />
          ))}
        </div>

        {!searchQuery && totalPages > 1 && (
          <div className="pt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {selectedPokemon && isModalDetailOpen && (
          <ModalPokeDetail
            pokemonName={selectedPokemon}
            open={isModalDetailOpen}
            onClose={() => setIsModalDetailOpen(false)}
          />
        )}
      </div>
    </main>
  );
}
