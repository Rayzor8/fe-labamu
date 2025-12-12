"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { usePokemonDetail } from "@/hooks/use-pokemon";
import { getPokemonImageUrl } from "@/lib/api/pokemon-api";
import { cn } from "@/lib/utils";
import { Ruler, Weight } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import DetailSkeleton from "../custom/detail-skeleton";

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-400",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-amber-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-stone-500",
  ghost: "bg-purple-700",
  dragon: "bg-violet-600",
  dark: "bg-gray-700",
  steel: "bg-slate-400",
  fairy: "bg-pink-300",
};

interface ModalPokeDetailProps {
  pokemonName: string | null;
  open: boolean;
  onClose: () => void;
}

export function ModalPokeDetail({
  pokemonName,
  open,
  onClose,
}: ModalPokeDetailProps) {
  const { pokemon, isLoading } = usePokemonDetail(pokemonName);
  const formatStatName = (name: string) => {
    return name
      .replace("special-attack", "Sp. Atk")
      .replace("special-defense", "Sp. Def")
      .replace("hp", "HP")
      .replace("attack", "Attack")
      .replace("defense", "Defense")
      .replace("speed", "Speed");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {pokemon?.name ?? "Pokémon"} Details
          </DialogTitle>
          <DialogDescription className="sr-only">
            Pokemon detail
          </DialogDescription>
        </DialogHeader>
        {isLoading || !pokemon ? (
          <DetailSkeleton />
        ) : (
          <>
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative w-full sm:w-48 aspect-square bg-secondary/30 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/10" />
                  <Image
                    src={getPokemonImageUrl(pokemon.id) || "/placeholder.svg"}
                    alt={pokemon.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 100vw, 192px"
                    priority
                    loading="eager"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-foreground capitalize">
                        {pokemon.name}
                      </h2>
                      <span className="text-muted-foreground font-mono text-lg">
                        #{String(pokemon.id).padStart(3, "0")}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {pokemon.types.map((t) => (
                        <Badge
                          key={t.type.name}
                          className={cn(
                            "capitalize text-sm px-3 py-1 text-white border-0",
                            typeColors[t.type.name] || "bg-gray-500"
                          )}
                        >
                          {t.type.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Ruler className="h-4 w-4" />
                        <span className="text-sm">Height</span>
                      </div>
                      <p className="text-xl font-semibold text-foreground">
                        {(pokemon.height / 10).toFixed(1)} m
                      </p>
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Weight className="h-4 w-4" />
                        <span className="text-sm">Weight</span>
                      </div>
                      <p className="text-xl font-semibold text-foreground">
                        {(pokemon.weight / 10).toFixed(1)} kg
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Base Stats
                </h3>
                <div className="border border-border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-foreground">Stat</TableHead>
                        <TableHead className="text-right text-foreground">
                          Value
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pokemon.stats.map((stat) => (
                        <TableRow key={stat.stat.name}>
                          <TableCell className="font-medium text-foreground">
                            {formatStatName(stat.stat.name)}
                          </TableCell>
                          <TableCell className="text-right font-semibold text-foreground">
                            {stat.base_stat}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-secondary/20 font-bold">
                        <TableCell className=" text-accent  text-lg">
                          Total
                        </TableCell>
                        <TableCell className="text-right text-accent text-lg">
                          {pokemon.stats.reduce(
                            (acc, stat) => acc + stat.base_stat,
                            0
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
