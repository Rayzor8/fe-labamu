import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              Pokedex 
            </h1>
            <p className="text-sm text-muted-foreground hidden sm:block">
              Discover and explore Pokemon
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
