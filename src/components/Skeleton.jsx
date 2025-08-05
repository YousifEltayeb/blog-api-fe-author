import { Skeleton } from "@/components/ui/skeleton";
export default function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-[850px]" />
        <Skeleton className="h-8 w-[400px]" />
      </div>
    </div>
  );
}
