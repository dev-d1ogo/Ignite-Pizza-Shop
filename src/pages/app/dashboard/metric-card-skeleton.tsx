import { Skeleton } from "@/components/ui/skeleton";

export const CardSkeleton = () => {
  return (
    <>
      <Skeleton className="h-7 w-36 mt-1"></Skeleton>
      <Skeleton className="h-4 w-52"></Skeleton>
    </>
  );
};
