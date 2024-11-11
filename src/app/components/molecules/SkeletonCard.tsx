import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex md:flex-row flex-col gap-y-3 md:space-x-3">
      <Skeleton className="sm:w-full md:w-1/4 md:min-w-32 h-52 md:h-24 rounded-xl" />
      <div className="space-y-4 w-full">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-[200px]" />
        <div className="flex space-x-3">
          <Skeleton className="h-6 w-[100px]" />
          <Skeleton className="h-6 w-[100px]" />
        </div>
      </div>
    </div>
  );
}
