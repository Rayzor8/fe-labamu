"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchFormSchema, SearchFormValues } from "@/lib/schemas/pokemon";

interface SearchBarProps {
  onSearch: (value: string) => void;
  defaultValue?: string;
}

export function SearchBar({ onSearch, defaultValue = "" }: SearchBarProps) {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(SearchFormSchema),
    defaultValues: {
      query: defaultValue,
    },
  });

  const handleSubmit = (data: SearchFormValues) => {
    onSearch(data.query);
  };

  const handleClear = () => {
    form.reset({ query: "" });
    onSearch("");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full max-w-md"
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      type="text"
                      placeholder="Search Pokemon..."
                      className="pl-10 pr-10 bg-card border-border focus:border-primary h-11"
                    />
                    {field.value && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleClear}
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear search</span>
                      </Button>
                    )}
                  </div>
                  <Button type="submit" size="lg" className="h-11 px-6">
                    Search
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
