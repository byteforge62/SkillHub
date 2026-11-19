import { cn } from "@/lib/cn";

export const Skeleton = ({ className, ...props }) => (
  <div
    className={cn("skeleton rounded-xl", className)}
    aria-hidden="true"
    {...props}
  />
);

export const SkeletonText = ({ lines = 3, className }) => (
  <div className={cn("space-y-2.5", className)}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        className={cn("h-3", index === lines - 1 ? "w-2/3" : "w-full")}
      />
    ))}
  </div>
);

export const SkeletonCard = ({ className }) => (
  <div
    className={cn(
      "rounded-3xl border border-[color:var(--color-line)] bg-white p-6",
      className,
    )}
  >
    <Skeleton className="h-40 w-full rounded-2xl" />
    <Skeleton className="mt-5 h-3 w-24" />
    <Skeleton className="mt-3 h-5 w-3/4" />
    <SkeletonText className="mt-4" lines={2} />
  </div>
);

export const SkeletonGrid = ({ count = 3, className }) => (
  <div
    className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}
    role="status"
    aria-label="Loading content"
  >
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

export default Skeleton;
