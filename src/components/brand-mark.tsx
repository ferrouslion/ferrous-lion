import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/crest-sm.png"
      alt=""
      className={cn("size-8 rounded-full object-cover outline-none", className)}
    />
  );
}
