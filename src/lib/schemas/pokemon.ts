import { z } from "zod";

export const PokemonBasicSchema = z.object({
  name: z.string(),
  url: z.url(),
});

export const PokemonListResponseSchema = z.object({
  count: z.number(),
  next: z.url().nullable(),
  previous: z.url().nullable(),
  results: z.array(PokemonBasicSchema),
});

export const PokemonStatSchema = z.object({
  base_stat: z.number(),
  effort: z.number(),
  stat: z.object({
    name: z.string(),
    url: z.url(),
  }),
});

export const PokemonTypeSchema = z.object({
  slot: z.number(),
  type: z.object({
    name: z.string(),
    url: z.url(),
  }),
});

export const PokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  sprites: z.object({
    front_default: z.string().url().nullable(),
    other: z.object({
      "official-artwork": z.object({
        front_default: z.string().url().nullable(),
      }),
    }),
  }),
  stats: z.array(PokemonStatSchema),
  types: z.array(PokemonTypeSchema),
});

export type PokemonBasic = z.infer<typeof PokemonBasicSchema>;
export type PokemonListResponse = z.infer<typeof PokemonListResponseSchema>;
export type PokemonDetail = z.infer<typeof PokemonDetailSchema>;
export type PokemonStat = z.infer<typeof PokemonStatSchema>;
export type PokemonType = z.infer<typeof PokemonTypeSchema>;
