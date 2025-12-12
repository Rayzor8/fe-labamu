"use client";

import { fetchPokemonDetail, fetchPokemonList } from "@/lib/api/pokemon-api"
import { PokemonDetail, PokemonListResponse } from "@/lib/schemas/pokemon"
import { useCallback, useEffect, useState } from "react"

export function usePokemonList(offset = 0, limit = 20) {
  const [data, setData] = useState<PokemonListResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await fetchPokemonList(offset, limit)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch"))
    } finally {
      setIsLoading(false)
    }
  }, [offset, limit])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    pokemonList: data,
    isLoading,
    isError: error,
    mutate: fetchData,
  }
}


export function usePokemonDetail(nameOrId: string | number | null) {
  const [data, setData] = useState<PokemonDetail | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!nameOrId) {
      setData(null)
      return
    }

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const result = await fetchPokemonDetail(nameOrId)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [nameOrId])

  return {
    pokemon: data,
    isLoading,
    isError: error,
  }
}