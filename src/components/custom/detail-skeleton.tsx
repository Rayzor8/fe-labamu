import { Skeleton } from "../ui/skeleton";

export default function DetailSkeleton() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row gap-6">
        <Skeleton className="w-full sm:w-48 aspect-square rounded-xl" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    </div>
  );
}
