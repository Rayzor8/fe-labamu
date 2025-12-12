"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getPokemonIdFromUrl, getPokemonImageUrl } from "@/lib/api/pokemon-api";
import { useState } from "react";
interface PokemonCardProps {
  name: string;
  url: string;
  onClick: () => void;
}

export function PokemonCard({ name, url, onClick }: PokemonCardProps) {
  const id = getPokemonIdFromUrl(url);
  const [imgSrc, setImgSrc] = useState<string>(getPokemonImageUrl(id));
  
  return (
    <Card
      onClick={onClick}
      className="bg-card border-border hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer group"
    >
      <CardContent className="p-4">
        <div className="relative w-full aspect-square bg-secondary/30 rounded-lg mb-4 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent" />
          <Image
            src={imgSrc}
            alt={name}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            priority
            loading="eager"
            onError={() => setImgSrc("/next.svg")}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground capitalize text-lg">
              {name}
            </h3>
            <span className="text-muted-foreground text-sm font-mono">
              #{String(id).padStart(3, "0")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
